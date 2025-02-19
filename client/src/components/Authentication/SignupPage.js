import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("event-goer"); // Default role
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 🔹 Handle Signup via Backend API
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://your-backend.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (!response.ok) throw new Error("Signup failed. Try again.");

      navigate("/profile"); // Redirect on success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
          <option value="event-goer">Event Goer</option>
          <option value="organizer">Organizer</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Sign Up
        </button>
      </form>

      <p className="mt-4">
        Already have an account? <a href="/" className="text-blue-600">Login</a>
      </p>
    </div>
  );
};

export default SignupPage;
