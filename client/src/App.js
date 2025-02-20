import React, { useEffect, useState } from "react";
import LandingPage from './Pages/LandingPage';  // Correct the import path
import Navbar from './components/Navbar';import { Outlet } from 'react-router-dom';
import Reviews from './components/Reviews';
import Footer from './Pages/Footer';

// import AddTicket from './Pages/AddTicket';
function App() {
  const [user, setUser] = useState(null);


  async function check_session() {
    try {
      const response = await fetch("https://tiketi-tamashafrunt.onrender.com/check_session", {
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
    < Footer/>
  
    
    </>
  )
}

export default App;
