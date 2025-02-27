import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Attendee");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let [onLogin,user,check_session] = useOutletContext();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

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
      {error && <p className="text-red-500">{error}</p>}

      {/* 🔹 Signup Form */}
      <form onSubmit={handleSignup} className="bg-white p-6 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          required
        />
        
        {/* 🔹 Role Selection */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        >
          <option value="Attendee">Event Goer</option>
          <option value="Organizer">Organizer</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Sign Up
        </button>
      </form>
      <Link to={`/login`}>
      <p className="mt-4">
        Already have an account? <a href="/" className="text-blue-600">Login</a>
      </p>
      </Link>
    </div>
    </div>
  );
};

export default SignupPage;
