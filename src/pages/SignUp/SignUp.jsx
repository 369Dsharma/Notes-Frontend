import PasswordInput from '@/components/Input/PasswordInput';
import Navbar from '@/components/Navbar/Navbar'
import axiosInstance from '@/utils/axiosInstance';
import { validateEmail } from '@/utils/helper';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async(e)=>{
    e.preventDefault();

    if(!name)
    {
      setError("Please entr your name");
      return;
    }

    if(!validateEmail(email))
    {
      setError("Please enter a valid email address.");
      return;
    }

    if(!password)
    {
      setError("Please enter the password");
    }

    setError("");

    // SignUp API Call

    await axiosInstance.post("/send-otp", { email, purpose: "signup" });
  sessionStorage.setItem(
    "pendingSignup",
    JSON.stringify({ fullName: name, email, password })
  );
  navigate(`/verify-email?email=${encodeURIComponent(email)}&purpose=signup`);
  return;
};

 
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      const { data } = await axiosInstance.post("/auth/google", { idToken });
      if (!data.error && data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        navigate("/dashboard");
      } else {
        setError(data?.message || "Google signup failed.");
      }
    } catch {
      setError("Google signup failed. Please try again.");
    }
  };

  return (
    <>
          <div className="flex items-center justify-center mt-35">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSignup}>
          <h4 className="text-2xl mb-5">Signup</h4>

          <label className="text-xm font-bold">Name</label>
          <input
            type="text"
            placeholder="Enter your Name"
            className="input-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="text-xm font-bold">Email</label>
          <input
            type="text"
            placeholder="Enter your Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="text-xm font-bold">Password</label>
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <p className="text-red-500 text-x pb-1">{error}</p>}

          <button type="submit" className="btn-primary w-full">Create Account</button>

          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-500">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError("Google signup failed.")} />
          </div>

          <p className="mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-500 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default SignUp
