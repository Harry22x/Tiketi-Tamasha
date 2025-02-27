import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Pages/Footer";

function App() {
  const [user, setUser] = useState(null);
  const isMounted = useRef(true); // Prevent state updates on an unmounted component

  const getToken = () => localStorage.getItem("jwtToken");

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
