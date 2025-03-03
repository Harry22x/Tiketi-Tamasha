"use client";
import React from "react";
import styles from "./Dashboard.module.css";
import SideBar from "../components/SideBar";
import EventCard from "../components/EventCard";
import { useNavigate,useOutletContext} from "react-router-dom";
import AddTicket from "./AddTicket";


function AttendeeDashboard() {
    let [onLogin,user] = useOutletContext();
    let used_events=[];
    if (!user) {
        return (
            <div className="account-loader">
              <div className="spinner"></div>
            </div>
        );
    }
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* Create a wrapper container with flexbox */}
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }} className="app-layout">
  
          {/* Your sidebar/dashboard */}
          <SideBar user={user} />
          
          {/* Main content area */}
         
         
          <main className={styles.container}>
            <section className={styles.projectsSection}>
              <h2 className={styles.sectionTitle}>Your Attending events:</h2>
              {user.user_tickets.length > 0 ? (null):(<h1>This is where your attening events would show but you are currently not attending any</h1>)}
              <div className={styles.projectsGrid}>
             
        <div >
          <section  style={{backgroundColor:"#fff",boxShadow:"0 4px 6px #0000001a", borderRadius:"8px"}}>
          {user.user_tickets.map((data, index) => {            
         
         
         if(!used_events.includes(data.event_ticket.event.id)){
                used_events.push(data.event_ticket.event.id)
                return (<div>

                
                <EventCard key={index} {...data.event_ticket.event} />
                 <h1  className={styles.projectTitle}>Tickets bought:</h1>
  
                <h1  className={styles.projectTitle}>{data.ticket_quantity} {data.event_ticket.ticket_type}</h1>
                
                </div>)
            }
            return <h1 className={styles.projectTitle}>{data.ticket_quantity} {data.event_ticket.ticket_type}</h1>
          })}
          </section>
          </div>
        
              </div>
            </section>
  
            <aside className={styles.rightSidebar}>
              {/* ...announcements and trending sections... */}
              
            </aside>
          </main>
          
        
        </div>
        
      </>
    );
  }


export default AttendeeDashboard;