import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import BookerDashboard from './Authentication/Booker';
import CreatorDashboard from './Authentication/Creator';
import Login from './Authentication/LoginPage';
import LogoutButton from './Authentication/LogoutPage';
import ProfilePage from './Authentication/Profile';
import Signup from './Authentication/SignupPage';
import './index.css';


function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="text-3xl text-center mt-8">Project Client</h1>

        {/* Navigation Bar */}
        <nav className="mt-6">
          <ul className="flex justify-center space-x-4">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/signup" 
                className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}
              >
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/booker-dashboard" 
                className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}
              >
                Booker Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/creator-dashboard" 
                className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}
              >
                Creator Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/logout" 
                className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : ''}
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/booker-dashboard" element={<BookerDashboard />} />
          <Route path="/creator-dashboard" element={<CreatorDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/logout" element={<LogoutButton />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
