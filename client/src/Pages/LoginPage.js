import React,{useState} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
export default function LoginPage() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const navigate = useNavigate();
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  let [onLogin,user] = useOutletContext();
 
  const onSubmit = async (data) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

     else{
      response.json().then((user) => onLogin(user)).then(navigate("/"))
      };
    } catch (error) {
      setError("apiError", { message: error.message });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
  
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            value = {username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        
          {errors.apiError && <p className="text-red-500">{errors.apiError.message}</p>}

          
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
            Login
          </button>
        </form>

        <Link to={`/signup`}>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
        </Link>
      </div>
    </div>
  );
}
