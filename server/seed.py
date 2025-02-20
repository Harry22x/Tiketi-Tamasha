#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc, choices


import string
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db,User, UserTicket, Event, EventTicket

def seed_data():
    fake = Faker()
    with db.session.begin():
        print("Starting seed...")
        print('Deleting data')
        User.query.delete()
        UserTicket.query.delete()
        Event.query.delete()
        EventTicket.query.delete()

        print("Creating users...")
        users = []
        usernames = []
        roles = ['Organizer','Attendee']

        for i in range(20):
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(username=username, email = fake.email(), role = rc(roles) )
            user.password_hash = user.username + 'password'

            users.append(user)

        db.session.add_all(users)

        print("Creating events...")

        events = [
            Event(
                name="SIP & VIBE",
                description="Sip on your favorite drink and vibe to smooth tunes in a laid-back atmosphere. Whether you're into casual conversations or just relaxing with friends, this event is the perfect escape to unwind and enjoy great company.",
                date="March 20, 2025",
                time="10:00 AM",
                image="https://github.com/Harry22x/Tiketi-Tamasha/blob/stacy-branch/client/src/images/image1.jpeg?raw=true",
                location = fake.address()
            ),
            Event(
                name="HIP-HOP STREET",
                description="Get ready to feel the beat at HIP-HOP STREET! A high-energy event full of electrifying performances, breakdancing battles, and the freshest tracks in the game. Whether you're a seasoned dancer or just love the vibe, this is the place to be for a night of fun, music, and urban culture!",
                date="March 15, 2025",
                time="2:00 PM",
                image="https://github.com/Harry22x/Tiketi-Tamasha/blob/stacy-branch/client/src/images/image2.jpeg?raw=true",
                location = fake.address()
            ),
            Event(
                name="POETRY & CLAY",
                description="Let your creativity flow at Poetry & Clay! A unique event where words and art come together. Experience powerful spoken word performances while you get your hands dirty in a clay art session, creating your very own masterpieces!",
                date="April 10, 2025",
                time="9:00 AM",
                image="https://github.com/Harry22x/Tiketi-Tamasha/blob/stacy-branch/client/src/images/image3.jpeg?raw=true",
                location = fake.address()
            ),
            Event(
                name="CHESS WORKSHOP",
                description="Sharpen your mind at the Chess Workshop! Whether you're a beginner or a seasoned player, join us for an insightful session of strategy, puzzles, and learning from chess experts. Perfect for anyone looking to improve their game and take their skills to the next level!",
                date="May 5, 2025",
                time="11:30 AM",
                image="https://github.com/Harry22x/Tiketi-Tamasha/blob/stacy-branch/client/src/images/image4.jpeg?raw=true",
                location = fake.address()
            ),
            Event(
                name="BACK TO ROCK",
                description="Step back in time with Back to Rock! This event celebrates the golden era of rock music with live bands playing your favorite classic hits. If you love the raw energy of guitars, drums, and vocals, this nostalgic experience will take you on a wild ride through the heart of rock!",
                date="June 30, 2025",
                time="1:00 PM",
                image="https://github.com/Harry22x/Tiketi-Tamasha/blob/stacy-branch/client/src/images/image5.jpeg?raw=true",
                location = fake.address()
            ),
            Event(
                name="TARMAC RACING",
                description="Get your engines revving at Tarmac Racing! A thrilling day of high-speed action where you'll witness adrenaline-fueled races and see some of the fastest cars tear through the track. Feel the rush as skilled drivers go head-to-head in a heart-pounding race to the finish line!",
                date="July 25, 2025",
                time="4:00 PM",
                image="https://github.com/Harry22x/Tiketi-Tamasha/blob/stacy-branch/client/src/images/image6.jpeg?raw=true",
                location = fake.address()
            )
        ]
        db.session.add_all(events)

    
        print('Creating event_tickets...')
        event_tickets = []
        for event in events:
            
            regular_ticket = EventTicket(
                ticket_type="regular",
                price=randint(20, 90),
                available_quantity=randint(40, 60),
                sale_end_date=fake.date_between(start_date="today", end_date="+60d")
            )
            regular_ticket.event = event
            event_tickets.append(regular_ticket)
            
            
            advanced_ticket = EventTicket(
                ticket_type="advanced",
                price=randint(10, 50),
                available_quantity=randint(20, 40),
                sale_end_date=fake.date_between(start_date="today", end_date="+20d")
            )
            advanced_ticket.event = event
            event_tickets.append(advanced_ticket)
            
           
            vip_ticket = EventTicket(
                ticket_type="vip",
                price=randint(90, 150),
                available_quantity=randint(20, 30),
                sale_end_date=fake.date_between(start_date="today", end_date="+20d")
            )
            vip_ticket.event = event
            event_tickets.append(vip_ticket)
        db.session.add_all(event_tickets)


        print("Creating user_tickets...")
        user_tickets = []
        for event_ticket  in event_tickets:
            new_user_ticket = UserTicket(ticket_quantity = randint(1,5),ticket_code = ''.join(  choices(string.ascii_letters + string.digits, k=10)) )
            new_user_ticket.event_ticket = event_ticket
            new_user_ticket.user = rc(users)
            user_tickets.append(new_user_ticket)
        db.session.add_all(user_tickets)


        db.session.commit()
        print("Complete")