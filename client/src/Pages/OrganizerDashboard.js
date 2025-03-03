"use client";
import React from "react";
import styles from "./Dashboard.module.css";
import SideBar from "../components/SideBar";
import MyEventCard from "../components/MyEventCard";
import { useNavigate,useOutletContext} from "react-router-dom";
import AddTicket from "./AddTicket";

function Dashboard() {
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
        
        
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }} className="app-layout">
  
          <SideBar user={user} />
                                  
          <main className={styles.container}>
            <section className={styles.projectsSection}>
              <h2 className={styles.sectionTitle}>Your Events</h2>
              {user.user_events.length > 0 ? (null):(<h1>This is where your hosted events would show but you are currently not hosting any</h1>)}
              <div className={styles.projectsGrid}>
              {user.role == 'Organizer' ? (
            <>
            {user.user_events.map((data) =><MyEventCard key={data.event.id} id={data.event.id} name={data.event.name} description={data.event.description}
             time={data.event.time} image={data.event} date={data.event.date} location={data.event.location} event_tickets={data.event.event_tickets}/>)}
            
            </>
        ):(null)}
        
              </div>
            </section>
  
            <aside className={styles.rightSidebar}>
              
              
            </aside>
          </main>
          
        
        </div>
        
      </>
    );
  }


export default Dashboard;