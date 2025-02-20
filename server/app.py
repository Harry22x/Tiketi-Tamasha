#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,make_response,session
from flask_restful import Resource
import os

# Local imports
from config import app, db, api
# Add your model imports
from models import User, UserTicket, Event, EventTicket

# Views go here!

with app.app_context():
    db.create_all() 
    print("✅ Database tables created (if not already present)")




if os.getenv("RUN_SEED") == "true":
    from seed import seed_data  

  
    with app.app_context():
        seed_data()
        print("✅ Seed data inserted successfully.")




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

class EventByID(Resource):
    def get(self, id):
        event = Event.query.get(id)
        if event:
            return make_response(event.to_dict(),200)
        else:
            return make_response({"error":"Event does not exist"},404)
class Signup(Resource):
    pass
    def post(self):
        data = request.get_json()
        
        
        errors = {}
        
       
        if not data.get('username'):
            errors['username'] = 'Username is required'
        
        
        if not data.get('password'):
            errors['password'] = 'Password is required'
        # elif len(data['password']) < 6:
        #     errors['password'] = 'Password must be at least 6 characters'
        
       
        if errors:
            return {'errors': errors}, 422
        
        try:
            new_user = User(
                username=data['username'],
                email = data['email'],
                role = data['role'],
                
            )
           
            new_user.password_hash = data['password']
            
           
            db.session.add(new_user)
            db.session.commit()
        except ValueError as e:
            
            return {'errors': {'username': str(e)}}, 422
        except Exception as e:
            db.session.rollback()
            return {'errors': {'database': 'Error saving user'}}, 422
        
      
        session['user_id'] = new_user.id
        session.permanent = True
        
       
        return new_user.to_dict(), 201
    
class Login(Resource):
    def post(self):
        data = request.get_json()
        
        user = User.query.filter_by(username=data.get('username')).first()
        
        
      
        if user and user.authenticate(data.get('password', '')):
            
            session['user_id'] = user.id
            session.permanent = True
            
           
            return user.to_dict(), 200
        
        #print(session['user_id'])
        return {'error': ['Invalid username or password']}, 401
class CheckSession(Resource):
    pass
    def get(self):
      
        user_id = session.get('user_id')
        # logging.debug(f"Session user_id: {user_id}")
        
        if  user_id:
            user = User.query.filter_by(id=user_id).first()              

            serialized_user = user.to_dict()

            
            return serialized_user, 200
            
        
        else:
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

api.add_resource(Events,'/events')
api.add_resource(EventByID,'/events/<int:id>')
api.add_resource(Signup,'/signup')
api.add_resource(Login, '/login')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Logout, '/logout')











if __name__ == '__main__':
    app.run(port=5555, debug=True)

