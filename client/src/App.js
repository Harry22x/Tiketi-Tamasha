import React from 'react';
 // Correct the import path
import Navbar from './components/Navbar';

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
