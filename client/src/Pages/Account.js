import { useState, useEffect } from "react";
import { useNavigate,useOutletContext} from "react-router-dom";
import EventCard from "../components/EventCard";
import MyEventCard from "../components/MyEventCard";
import './Account.css';
import './LoadingAnimation.css';
import './Account.css'
function Account(){
    let [onLogin,user] = useOutletContext();
    let used_events=[];
    if (!user) {
        return (
            <div className="account-loader">
              <div className="spinner"></div>
            </div>
        );
    }
    return(<>
    <div className="account-container">
        <h2 className="account-heading">User Dashboard</h2>
        <h2 className="account-subheading">Hello {user.username}</h2>
        {user.role == 'Organizer' ? (
            <>
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">My events:  </h1>
         
            {user.user_events.length > 0 ? (null):(<h1>This is where your hosted events would show but you are currently not hosting any</h1>)}
            {user.user_events.map((data) =><MyEventCard key={data.event.id} id={data.event.id} name={data.event.name} description={data.event.description}
             time={data.event.time} image={data.event} date={data.event.date} location={data.event.location}/>)}
            </>
        ):(null)}
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-6">Attending events:</h3>
        {user.user_tickets.length > 0 ? (null):(<h1>This is where your attening events would show but you are currently not attending any</h1>)}
        <div style={{ display: "contents", gap: "100px", flexWrap: "wrap"}} >{user.user_tickets.map((data, index) => {            
            if(!used_events.includes(data.event_ticket.event.id)){
                used_events.push(data.event_ticket.event.id)
                return (<>
                <EventCard key={index} {...data.event_ticket.event} />
                 <h1 className="account-heading">Tickets bought:</h1>
                <ul> <li className="account-ticket-info">{data.ticket_quantity} {data.event_ticket.ticket_type}</li></ul>
                </>)
            }
            return <h1 className="account-ticket-info">{data.ticket_quantity} {data.event_ticket.ticket_type}</h1>
          })}</div>
        </div>
    </>)
}

export default Account;
