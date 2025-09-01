import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const email   = params.get("email");
  const purpose = params.get("purpose") || "signup";
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      let payload = { email, code, purpose };
      if (purpose === "signup") {
        const pending = JSON.parse(sessionStorage.getItem("pendingSignup") || "{}");
        payload.fullName = pending.fullName;
        payload.password = pending.password;
      }
      const { data } = await axiosInstance.post("/verify-otp", payload);
      if (!data.error && data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        sessionStorage.removeItem("pendingSignup");
        navigate("/dashboard");
      } else {
        setError(data?.message || "Verification failed.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.",err);
    }
  };

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-xl font-semibold">Verify email</h1>
      <p className="mt-1 text-sm text-slate-600">We sent a 6‑digit code to {email}.Check your Spam also.</p>

      <form onSubmit={handleVerify} className="mt-4 space-y-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full rounded border px-3 py-2"
          placeholder="Enter 6-digit code"
          maxLength={7}
          inputMode="numeric"
          autoFocus
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full rounded bg-black px-4 py-2 font-semibold text-white">Verify</button>
      </form>
    </div>
  );
}
