"use client";
import { useState } from "react";
import { useForm } from "react-hook-form"; // Correct import
import { auth, googleProvider, db } from "./FireBase";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // React Router for navigation

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [role, setRole] = useState("event_creator");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Navigation hook

  // Handle Email/Password Signup
  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage(""); // Clear previous errors
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        email: data.email,
        role: role,
      });

      // Send email verification
      await sendEmailVerification(user);
      setEmailSent(true);
      console.log("Verification email sent!");

      // Sign out user until they verify email
      await signOut(auth);

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.message);
      setErrorMessage(error.message); // Display error message to user
    }
    setLoading(false);
  };

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    setLoading(true);
    setErrorMessage(""); // Clear previous errors
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // New user, save their data
        await setDoc(userRef, {
          name: user.displayName || "",
          email: user.email,
          role: role, // Default to selected role
        });
      }

      console.log("Google Sign-In Successful:", user);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Google Signup Error:", error.message);
      setErrorMessage("Google Sign-In failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        {emailSent ? (
          <p className="text-green-500 text-center">Verification email sent! Please check your inbox.</p>
        ) : (
          <>
            <div className="flex justify-center my-4">
              <button
                className={`px-4 py-2 rounded-l-full ${role === "event_creator" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setRole("event_creator")}
              >
                Event Creator
              </button>
              <button
                className={`px-4 py-2 rounded-r-full ${role === "event_booker" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setRole("event_booker")}
              >
                Event Booker
              </button>
            </div>

            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}

              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}

              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}

              <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-2 rounded-lg">
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p>Or sign up with:</p>
              <button onClick={handleGoogleSignup} disabled={loading} className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg">
                {loading ? "Signing in..." : "Sign Up with Google"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
