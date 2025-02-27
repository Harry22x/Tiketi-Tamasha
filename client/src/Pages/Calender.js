import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import { useOutletContext } from 'react-router-dom'
function Calender(){
  
let [onLogin,user] = useOutletContext()
let usedevents = [] ;
let dates = []

user.user_tickets.map((data)=>{
    if(!usedevents.includes(data.event_ticket.event.id)){
        usedevents.push(data.event_ticket.event.id)
        dates.push({title: data.event_ticket.event.name, date: data.event_ticket.event.date})
        
}})    

  const handleDateClick = (arg) => {
        console.log(arg)
      }
    return(
        <>
       <main style={{marginTop:"90px"}}>
        <h1>This calender shows you when your upcoming events are taking place:</h1>
        <div style={{width:"1000px"}}>      
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
  weekends={true}
  events={dates}
/>
    
    </div>
 </main>
        </>
    )
}

export default Calender 