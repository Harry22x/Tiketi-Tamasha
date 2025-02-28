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
  let [onLogin,user,check_session] = useOutletContext();

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
      console.log(errorData); 
      setError(errorData.errors || "Signup failed. Please try again."); 
      return;
    }
      const responseData = await response.json();
      const token = responseData.access_token; 
  
      if (token) {
        localStorage.setItem("jwt", token);  
        check_session(token);  
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
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
            id="username"
            className="signup-input"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
            required
          />
          <input
            type="email"
            id="email"
            className="signup-input"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            required
          />
          <input
            type="password"
            id="password"
            className="signup-input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
           
            required
          />
          
          <select
            id="role"
            className="signup-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            
          >
            <option value="Attendee">Event Goer</option>
            <option value="Organizer">Organizer</option>
          </select>

          <button type="submit" className="btn">Sign Up</button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
