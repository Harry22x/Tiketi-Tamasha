import { useState, useEffect } from "react";
import { useNavigate,useOutletContext} from "react-router-dom";
import EventCard from "../components/EventCard";

function Account(){
    let [onLogin,user] = useOutletContext();
    let used_events=[]
    console.log(user.user_tickets[0].event_ticket.event.id)
    return(<>
    <div style={{textAlign:"right"}}className="min-h-screen flex flex-col  pt-20 bg-gradient-to-br from-blue-600 to-purple-700 p-8">
    
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">User Dashboard</h2>
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-6">Hello {user.username}</h3>
        {user.user_tickets.map((data, index) => {            
            if(!used_events.includes(data.event_ticket.event.id)){
                used_events.push(data.event_ticket.event.id)
                return (<>
                <EventCard key={index} {...data.event_ticket.event} />
                <h1></h1>
                </>)
            }
          
          })}
      
        </div>
    </>)
}

export default Account