import React from 'react';
import LandingPage from './Pages/LandingPage';  // Correct the import path
import Navbar from './components/Navbar';
import UpcomingEvents from './Pages/UpcomingEvents';
import { Outlet } from 'react-router-dom';
import Reviews from './components/Reviews';
import Footer from './Pages/Footer';

// import AddTicket from './Pages/AddTicket';
function App() {
  return (
    <>
    <header>< Navbar/></header>
    <Outlet/>
    < Reviews />
    < Footer/>
  
    
    </>
  )
}

export default App;
