#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,make_response,session,jsonify
from flask_restful import Resource
import os
import requests
import base64
from datetime import datetime
from random import randint, choice as rc, choices
import cloudinary
# Import the cloudinary.api for managing assets
import cloudinary.api
# Import the cloudinary.uploader for uploading assets
import cloudinary.uploader
from cloudinary.utils import cloudinary_url
from faker import Faker
from flask_jwt_extended import  create_access_token, jwt_required, get_jwt_identity


import string

# Local imports
from config import app, db, api
# Add your model imports
from models import User, UserTicket, Event, EventTicket,UserEvent

# Views go here!






CONSUMER_KEY = "wrRTjoU6QhClK1Lf8TIJ0sxqJfCvfEgU68jepcKNxi96NHhR"
CONSUMER_SECRET = "4acLqqC1SxAoT7ym3G5Y2903zg7fNG24MgSQhsX1cNWfFf4aWw8fpMbJKpwPo0Za"
BUSINESS_SHORTCODE = "174379"
PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
CALLBACK_URL = "https://yourdomain.com/callback"

cloudinary.config(
    cloud_name="dccwd3mth",
    api_key="729594172262329",
    api_secret="P_8-ezHpnjm0vTYbjvz04y5lSYY",
    secure=True,
)



def get_mpesa_token():
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    auth = f"{CONSUMER_KEY}:{CONSUMER_SECRET}"
    encoded_auth = base64.b64encode(auth.encode()).decode()
    headers = {"Authorization": f"Basic {encoded_auth}"}
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        return None
def generate_password():
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    password_str = f"{BUSINESS_SHORTCODE}{PASSKEY}{timestamp}"
    encoded_password = base64.b64encode(password_str.encode()).decode()
    return encoded_password, timestamp

class get_token(Resource):
    def get(self):
        token = get_mpesa_token()
        if token:
            return jsonify({"access_token": token})
        else:
            return jsonify({"error": "Failed to get access token"}), 500
        

class stk_push(Resource):
    def post(self):
        token = get_mpesa_token()
        if not token:
            return jsonify({"error": "Failed to get access token"}), 500
        
        password, timestamp = generate_password()

        payload = {
            "BusinessShortCode": BUSINESS_SHORTCODE,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": request.json.get("amount", 1), 
            "PartyA": request.json.get("phone"),  
            "PartyB": BUSINESS_SHORTCODE,
            "PhoneNumber": request.json.get("phone"),
            "CallBackURL": CALLBACK_URL,
            "AccountReference": "Tiketi",
            "TransactionDesc": "Payment"
        }

        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }

        mpesa_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        response = requests.post(mpesa_url, json=payload, headers=headers)

        return response.json()
@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Events(Resource):
    def get(self):
        events = [{
            "id":event.id,
            "name": event.name,
            "description": event.description,
            "date": event.date,
            "time": event.time,
            "image": event.image,
        } for event in Event.query.all()]
        return make_response(events,200)

    def post(self):
            if 'image' not in request.files:
                return {"error": "No image file provided"}, 400

            image_file = request.files['image'] 
            
           
            upload_result = cloudinary.uploader.upload(
                image_file,
                transformation=[
                    {"width": 500, "height": 500, "crop": "fill", "gravity": "auto"}
                ]
            )

            
            name = request.form.get("name")
            description = request.form.get("description")
            date = request.form.get("date")
            time = request.form.get("time")
            location = request.form.get("location")

            
            if not all([name, description, date, time, location]):
                return {"error": "Missing event details"}, 400

            
            new_event = Event(
                name=name,
                description=description,
                date=date,
                time=time,
                image=upload_result["secure_url"], 
                location=location,
            )
            db.session.add(new_event)
            db.session.commit()

            return make_response(new_event.to_dict(), 201)
class GetEventByID(Resource):
    def get(self, id):
        event = Event.query.get(id)
        if event:
            return make_response(event.to_dict(),200)
        else:
            return make_response({"error":"Event does not exist"},404)
    
    def patch(self, id):
        event = Event.query.filter_by(id=id).first()
        if not event:
            return {"error": "Event not found"}, 404

        
        name = request.form.get("name")
        description = request.form.get("description")
        date = request.form.get("date")
        time = request.form.get("time")
        location = request.form.get("location")

        
        if "image" in request.files:
            image_file = request.files["image"]
            upload_result = cloudinary.uploader.upload(
                image_file,
                transformation=[{"width": 500, "height": 500, "crop": "fill", "gravity": "auto"}]
            )
            event.image = upload_result["secure_url"]

       
        if name:
            event.name = name
        if description:
            event.description = description
        if date:
            event.date = date
        if time:
            event.time = time
        if location:
            event.location = location

        db.session.commit()
        return make_response(event.to_dict(), 200) 
    def delete(self,id):
        event = Event.query.filter_by(id=id).first()
        db.session.delete(event)
        db.session.commit()

        response = make_response("",204)
        return response



class EventTickets(Resource):
    def post(self):
        data = request.get_json()

        new_event_ticket = EventTicket(
            event_id=data['event_id'],
            ticket_type=data['ticket_type'],
            price=data['price'],
            available_quantity=data['available_quantity'],
            sale_end_date=Faker().date_between(start_date="today", end_date="+60d"),
        )
        db.session.add(new_event_ticket)
        db.session.commit()

        return make_response(new_event_ticket.to_dict(), 201)

class UserEvents(Resource):
    def post(self):
        data = request.get_json()

        new_user_event = UserEvent(
            user_id = data['user_id'],
            event_id = data['event_id'],
        )
        db.session.add(new_user_event)
        db.session.commit()

        return make_response(new_user_event.to_dict(),201)



class Signup(Resource):
    def post(self):
        data = request.get_json()
        errors = {}

        if not data.get('username'):
            errors['username'] = 'Username is required'
        if not data.get('password'):
            errors['password'] = 'Password is required'
        
        if errors:
            return {'errors': errors}, 422

        try:
            new_user = User(
                username=data['username'],
                email=data.get('email', ''),
                role=data.get('role', '')
            )
            new_user.password_hash = data['password']  # Assuming you hash passwords

            db.session.add(new_user)
            db.session.commit()
        except Exception:
            db.session.rollback()
            return {'errors': {'database': 'Error saving user'}}, 422
        print(new_user)
        access_token = create_access_token(identity=str(new_user.id))  # Generate JWT token
        return {'access_token': access_token}, 200


    
class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data.get('username')).first()

        if user and user.authenticate(data.get('password', '')):
            access_token = create_access_token(identity=str(user.id))  # Generate JWT token
            return {'access_token': access_token}, 200

        return {'error': 'Invalid username or password'}, 401
    


class CheckSession(Resource):
    @jwt_required()  # Require JWT token
    def get(self):
        user_id = get_jwt_identity()  # Extract user ID from token
        user = User.query.get(user_id)

        if user:
            return user.to_dict(), 200
        return {'error': 'Unauthorized'}, 401


class Logout(Resource):
    def delete(self):
   
        user_id = session.get('user_id')
 
        try:
            session.pop('user_id', None)
            session.modified = True
     
            return '', 204
        except Exception as e:
            return {'error': str(e)}, 500
        

class HandleUserTickets(Resource):
    def post(self):
        data = request.get_json()

        new_user_ticket = UserTicket(
            user_id = data['user_id'],
            event_ticket_id = data['event_ticket_id'],
            ticket_quantity = data['ticket_quantity'],
            ticket_code = ''.join(  choices(string.ascii_letters + string.digits, k=10))
        )
        db.session.add(new_user_ticket)
        db.session.commit()



api.add_resource(Events,'/events')
api.add_resource(GetEventByID,'/events/<int:id>')
api.add_resource(Signup,'/signup')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, '/logout')
api.add_resource(get_token, '/get-token')
api.add_resource(stk_push,'/stk-push')
api.add_resource(HandleUserTickets, '/user-tickets')
api.add_resource(EventTickets,'/event-tickets')
api.add_resource(UserEvents, '/user-events')












if __name__ == '__main__':
    app.run(port=5555, debug=True)

