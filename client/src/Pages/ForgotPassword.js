import React, { useState } from 'react';


function ForgotPassword (){
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response =  await fetch('/forgot-password',{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ email }),
            });
            if (response.ok) {
                setMessage("Email successfully sent. Check your email to reset your password.");
            } else {
                const errorData = await response.json();
                setMessage(errorData.error || "Failed to send email. Please try again.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                     className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
        </div>
        </div>
        </>
    );
};

export default ForgotPassword;