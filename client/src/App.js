import React from 'react';
import LandingPage from './Pages/LandingPage';  // Correct the import path
import Navbar from './components/Navbar';
import UpcomingEvents from './Pages/UpcomingEvents';
// import AllEventsPage from './Pages/AllEventsPage';
function App() {
  return (
    <>
    < Navbar />
    <LandingPage />
    < UpcomingEvents />
    {/* < AllEventsPage /> */}
    </>
  )
}

export default App;
