"use client";
import { auth } from "./FireBase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // useNavigate from react-router-dom for navigation

export default function LogoutButton() {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg">
      Logout
    </button>
  );
}
