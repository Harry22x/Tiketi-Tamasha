import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Login from "./Authentication/LoginPage";
import ProfilePage from "./Authentication/Profile";
import Signup from "./Authentication/SignupPage";
import "./Authentication/index.css";

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white flex flex-col items-center">
        
        {/* Header */}
        <h1 className="text-5xl font-extrabold text-center mt-12 shadow-lg">EVENTICK</h1>
        {/* Navigation Bar */}
        <nav className="mt-8 bg-white shadow-xl rounded-full px-6 py-3 w-11/12 max-w-2xl">
          <ul className="flex justify-center space-x-6">
            {[
              { path: "/", label: "Login" },
              { path: "/signup", label: "Sign Up" },
              { path: "/profile", label: "Profile" },
            ].map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-lg font-semibold px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? "text-white bg-blue-600 shadow-md"
                        : "text-gray-600 hover:text-blue-500 hover:bg-gray-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Route Definitions */}
        <div className="mt-12 bg-white text-gray-800 rounded-xl shadow-xl w-11/12 max-w-lg p-8">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

