import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useOutletContext } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Attendee");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [setUser] = useOutletContext(); // Corrected to extract setUser

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed. Try again.");
      }

      const { token, user } = await response.json();

      // Store JWT securely
      localStorage.setItem("jwtToken", token);
      setUser(user); // Update user state

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleSignup} className="bg-white p-6 shadow-md rounded-lg">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-3 p-2 border rounded w-full focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 p-2 border rounded w-full focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3 p-2 border rounded w-full focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-3 p-2 border rounded w-full focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mb-3 p-2 border rounded w-full"
          >
            <option value="Attendee">Event Goer</option>
            <option value="Organizer">Organizer</option>
          </select>

          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
