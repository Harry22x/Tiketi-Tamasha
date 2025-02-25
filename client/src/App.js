import React, { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./Pages/Footer";

function App() {
  const [user, setUser] = useState(null);

  const getToken = () => localStorage.getItem("jwtToken");

  // Wrap checkSession with useCallback to prevent unnecessary re-creation
  const checkSession = useCallback(async () => {
    const token = getToken();

    if (!token) {
      console.warn("No JWT token found. User not authenticated.");
      setUser(null); // Ensure user state is cleared if token is missing
      return;
    }

    try {
      const response = await fetch("/check_session", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return userData;
      } else {
        console.error("Session check failed:", response.statusText);
        localStorage.removeItem("jwtToken"); // Remove invalid token
        setUser(null); // Clear user state
      }
    } catch (error) {
      console.error("Error checking session:", error);
      localStorage.removeItem("jwtToken"); // Ensure token is removed on error
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkSession();

    // Cleanup function (useful if component unmounts before fetch completes)
    return () => setUser(null);
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
