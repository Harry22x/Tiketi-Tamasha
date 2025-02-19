import React, { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "./FireBase"; // Ensure proper Firebase imports
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(""); // Error state
  const [confirmationResult, setConfirmationResult] = useState(null); // For OTP verification
  const [otp, setOtp] = useState(""); // OTP input
  const navigate = useNavigate();

  // 🔹 Email/Password Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/profile"); // Redirect on success
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already in use. Try logging in.");
      } else {
        setError(err.message);
      }
    }
  };

  // 🔹 Google Sign-In
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/profile");
    } catch (err) {
      setError("Google Sign-In failed: " + err.message);
    }
  };

  // 🔹 Phone Authentication (Send OTP)
  const sendOTP = async () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
    } catch (err) {
      setError("Failed to send OTP: " + err.message);
    }
  };

  // 🔹 Verify OTP
  const verifyOTP = async () => {
    if (!confirmationResult) return setError("No OTP sent.");
    try {
      await confirmationResult.confirm(otp);
      navigate("/profile");
    } catch (err) {
      setError("Invalid OTP: " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Show error message */}

      {/* 🔹 Email/Password Form */}
      <form onSubmit={handleSignup} className="bg-white p-6 shadow-md rounded-lg">
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Sign Up
        </button>
      </form>

      {/* 🔹 Google Sign-In */}
      <button onClick={handleGoogleSignup} className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full">
        Sign Up with Google
      </button>

      {/* 🔹 Phone Number Authentication */}
      <div className="mt-4 w-full">
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
        />
        <button onClick={sendOTP} className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Send OTP
        </button>

        {/* OTP Verification */}
        {confirmationResult && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mb-2 p-2 border rounded b-full"
            />
            <button onClick={verifyOTP} className="bg-purple-500 text-white px-4 py-2 rounded w-full">
              Verify OTP
            </button>
          </div>
        )}
      </div>

      {/* Recaptcha Container */}
      <div id="recaptcha-container"></div>

      <p className="mt-4">
        Already have an account? <a href="/" className="text-blue-600">Login</a>
      </p>
    </div>
  );
};

export default SignupPage;
