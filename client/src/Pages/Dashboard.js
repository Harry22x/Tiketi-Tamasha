import React from "react";
import styles from "./Dashboard.css";
import SideBar from "../components/SideBar";
import MyEventCard from "../components/MyEventCard";
import { useNavigate,useOutletContext} from "react-router-dom";
const ProjectCard = ({ title, description }) => (
  <article className={styles.projectCard}>
    <h3 className={styles.projectTitle}>{title}</h3>
    <p className={styles.projectDescription}>{description}</p>
    <div
      className={styles.cardActions}
      role="group"
      aria-label="Project actions"
    >
      <button aria-label="Star project" className={`ti ti-star ${styles.i}`} />
      <button aria-label="Watch project" className={`ti ti-eye ${styles.i}`} />
      <button
        aria-label="Share project"
        className={`ti ti-share ${styles.i}`}
      />
    </div>
  </article>
);

const AnnouncementItem = ({ title, text }) => (
  <article className={styles.announcementItem}>
    <h4 className={styles.announcementTitle}>{title}</h4>
    <p className={styles.announcementText}>{text}</p>
  </article>
);

const TrendingItem = ({ username, projectName }) => (
  <article className={styles.trendingItem}>
    <div
      className={styles.profilePic}
      role="img"
      aria-label={`${username}'s profile picture`}
    />
    <div className={styles.userInfo}>
      <h4 className={styles.username}>{username}</h4>
      <p className={styles.projectName}>{projectName}</p>
    </div>
  </article>
);

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
        
        {/* Create a wrapper container with flexbox */}
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }} className="app-layout">
  
          {/* Your sidebar/dashboard */}
          <SideBar />
          
          {/* Main content area */}
         
         
          <main className={styles.container2}>
            <section className={styles.projectsSection}>
              <h2 className={styles.sectionTitle}>Your Projects</h2>
              <div className={styles.projectsGrid}>
              {user.role == 'Organizer' ? (
            <>
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">My events:  </h1>
            <div style={{ display: "flex", gap: "100px", flexWrap: "wrap", textAlign: "left" }}>
         
            {user.user_events.length > 0 ? (null):(<h1>This is where your hosted events would show but you are currently not hosting any</h1>)}
            {user.user_events.map((data) =><MyEventCard key={data.event.id} id={data.event.id} name={data.event.name} description={data.event.description}
             time={data.event.time} image={data.event} date={data.event.date} location={data.event.location}/>)}
             
            </div>
            </>
        ):(null)}
        
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


export default Dashboard;
