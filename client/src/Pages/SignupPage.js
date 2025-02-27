import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useOutletContext } from "react-router-dom";
import "./SignupPage.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Attendee"); // Default role
  const [error, setError] = useState("");
  const navigate = useNavigate();
  let [onLogin, user] = useOutletContext();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      if (!response.ok) throw new Error("Signup failed. Try again.");
      else {
        response.json().then((user) => onLogin(user)).then(navigate("/"));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSignup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Attendee">Event Goer</option>
            <option value="Organizer">Organizer</option>
          </select>

          <button type="submit">Sign Up</button>
        </form>

        <Link to="/login">
          <p>Already have an account? <span className="login-link">Login</span></p>
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
