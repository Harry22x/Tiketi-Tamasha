import React, { useEffect, useState } from "react";
import LandingPage from './Pages/LandingPage';  
import Navbar from './components/Navbar';import { Outlet } from 'react-router-dom';


function App() {
  const [user, setUser] = useState(null);


  async function check_session() {
    try {
      const response = await fetch("/check_session", {
        method: "GET",
        credentials: "include"
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return userData; 
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  }
  
  useEffect(check_session, []);
  return (
    <>
    <header>< Navbar setUser={setUser} user={user}/></header>
    <Outlet context ={[setUser, user,check_session]}/>
    
  
    
    </>
  )
}

export default App;
