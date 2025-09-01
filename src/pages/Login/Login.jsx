import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '@/components/Input/PasswordInput'
import { validateEmail } from '@/utils/helper'
import axiosInstance from '@/utils/axiosInstance'
import { GoogleLogin } from '@react-oauth/google'



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e)=>{
        e.preventDefault();

        if(!validateEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }

        if(!password)
        {
            setError("Please enter the password");
            return;
        }

        setError("");

        // Login API Call
        try {
        const response = await axiosInstance.post("/login", {
            email: email,
            password: password,
        });

        // Handle successful login response
        if (response.data && response.data.accessToken) {
            localStorage.setItem("token", response.data.accessToken);
            navigate("/dashboard");
        }
        } catch (error) {
            // Handle login error
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }
            else{
                setError("An unexpected error occured. Please try again.");
            }
        }

    }

const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential; // Google ID token
      const { data } = await axiosInstance.post("/auth/google", { idToken });
      if (!data.error && data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        navigate("/dashboard");
      } else {
        setError(data?.message || "Google login failed.");
      }
    } catch (err) {
      setError("Google login failed. Please try again.",err);
    }
  };

  const handleGoogleError = (err) => {
    setError("Google sign-in was cancelled or failed.",err);
  };
  return (
    <>

       <div className="flex items-center justify-center mt-35">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-5">Login to your account</h4>

          <label className="text-xm font-bold">Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="text-xm font-bold">Password</label>
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <p className="text-red-500 text-x pb-1">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            Login
          </button>

          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-500">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
          </div>

          <p className="mt-4">
            Not registered yet?{" "}
            <Link to="/signup" className="font-medium text-blue-500 underline">
              Create an Account
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login
