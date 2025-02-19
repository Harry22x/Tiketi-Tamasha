#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request,make_response,session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, UserTicket, Event, EventTicket

# Views go here!

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



api.add_resource(Events,'/events')
api.add_resource(EventByID,'/events/<int:id>')











if __name__ == '__main__':
    app.run(port=5555, debug=True)

