import React, { useEffect, useState } from "react";
import LandingPage from './Pages/LandingPage';  
import Navbar from './components/Navbar';import { Outlet } from 'react-router-dom';
import Reviews from './components/Reviews';
import Footer from './Pages/Footer';

function App() {
  const [user, setUser] = useState(null);
  const isMounted = useRef(true); // Prevent state updates on unmounted component

  const getToken = () => localStorage.getItem("jwtToken");

  // Optimized checkSession function
  const checkSession = useCallback(async () => {
    const token = getToken();
    if (!token) {
      console.warn("No JWT token found. User not authenticated.");
      if (isMounted.current) setUser(null);
      return;
    }

    try {
      const response = await fetch("/check_session", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Session check failed:", response.statusText);
        localStorage.removeItem("jwtToken");
        if (isMounted.current) setUser(null);
        return;
      }

      const userData = await response.json();
      if (isMounted.current) setUser(userData);
    } catch (error) {
      console.error("Error checking session:", error);
      localStorage.removeItem("jwtToken");
      if (isMounted.current) setUser(null);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    checkSession();

    // Listen for token changes in localStorage (login/logout)
    const handleStorageChange = (event) => {
      if (event.key === "jwtToken") {
        checkSession();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      isMounted.current = false;
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkSession]);

  return (
    <>
      <header>
        <Navbar setUser={setUser} user={user} />
      </header>
      <Outlet context={[setUser, user, checkSession]} />
      <Footer />
    </>
  );
}

export default App;
