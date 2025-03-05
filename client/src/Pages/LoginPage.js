import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate,useOutletContext } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();
  let [onLogin,user,check_session] = useOutletContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://tiketi-tamashafrunt.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }
  
      const responseData = await response.json();
      const token = responseData.access_token; 
  
      if (token) {
        localStorage.setItem("jwt", token); 
        const userdata = await check_session(token);  
        await userdata

        userdata.role == "Organizer" ? (navigate('/organizer-dashboard')) :(navigate("/"))
        //navigate("/");
      }
    } catch (error) {
      setError("apiError", { message: error.message });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {errors.apiError && <p className="text-red-500 text-sm">{errors.apiError.message}</p>}

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>

        <Link to={`/signup`}>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
        </p> 
         </Link>
        <Link to={`/forgot-password`}>
        <p className="mt-4 text-center text-gray-600">
         <a className="text-blue-500 hover:underline">Forgot password</a>
        </p>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
