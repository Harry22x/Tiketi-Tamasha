from faker import Faker
import flask
import pytest
from random import randint, choice as rc

from app import app
from models import db,User, UserTicket, Event, EventTicket,UserEvent

app.secret_key = b'a\xdb\xd2\x13\x93\xc1\xe9\x97\xef2\xe3\x004U\xd1Z'

class TestSignup:
    '''Signup resource in app.py'''

    def test_creates_users_at_signup(self):
        '''creates user records with usernames and passwords at /signup.'''
        
        with app.app_context():
            
            User.query.delete()
            db.session.commit()
        
        with app.test_client() as client:
            
            response = client.post('/signup', json={
                'username': 'ashketchum',
                'password': 'pikachu',
                'email':'ashketchum@gmail.com',
                'role':'Organizer'
            })

            assert(response.status_code == 201)

            new_user = User.query.filter(User.username == 'ashketchum').first()

            assert(new_user)
            assert(new_user.authenticate('pikachu'))
            assert(new_user.email == 'ashketchum@gmail.com')
            assert(new_user.role =='Organizer' )

    def test_422s_invalid_users_at_signup(self):
        '''Return 422 to invalid usernames at /signup.'''
        
        with app.app_context():
            
            User.query.delete()
            db.session.commit()
        
        with app.test_client() as client:
            
            response = client.post('/signup', json={
                'password': 'pikachu',
                'email':'ashketchum@gmail.com',
                'role':'Organizer'
            })

            assert(response.status_code == 422)


class TestCheckSession:
    '''CheckSession resource in app.py'''

    def test_returns_user_json_for_active_session(self):
        '''returns JSON for the user's data if there is an active session.'''
        
        with app.app_context():
            
            User.query.delete()
            db.session.commit()
        
        with app.test_client() as client:

           
            token = client.post('/signup', json={
               'username': 'ashketchum',
                'password': 'pikachu',
                'email':'ashketchum@gmail.com',
                'role':'Organizer'
            })

            
            auth = token.json         

            response = client.get('/check_session',headers={'Authorization':f'Bearer {auth['access_token']}'})
            response_json = response.json
            
            assert response_json['id'] == 1
            assert response_json['username']

    def test_401s_for_no_session(self):
        '''returns a 401 Unauthorized status code if there is no active session.'''
        
        with app.test_client() as client:
            
            auth ={'access_token':None}        

            response = client.get('/check_session',headers={'Authorization':f'Bearer {None}'})

            
            assert response.status_code == 401