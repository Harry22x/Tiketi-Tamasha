import React, { useEffect, useState } from "react";
import LandingPage from './Pages/LandingPage';  
import Navbar from './components/Navbar';import { Outlet } from 'react-router-dom';
import Footer from "./Pages/Footer";

function App() {
  const [user, setUser] = useState(null);


  async function check_session(token) {
    try {
      

        const response = await fetch("/check_session", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
       
        if (response.ok) {
            const userData = await response.json();
            
            setUser(userData);
            return userData;
        } else {
            console.error("Session check failed:", response.status);
            const errorData = await response.json(); 
            console.error("Error data:", errorData);
            setUser(null);
        }
    } catch (error) {
        console.error("Error checking session:", error);
    }
}

useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
        check_session(token);
    }
}, []);


  return (
    <>
    <header>< Navbar setUser={setUser} user={user}/></header>
    <Outlet context ={[setUser, user,check_session]}/>
    <Footer/>
    
  
    
    </>
  )
}

export default App;
