import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { verifyOTP, resendOTP } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const otpSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  otp: yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
});

const VerifyOTP = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120); // Timer in seconds (2 minutes)
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const onSubmit = async (data) => {
    if (timer <= 0) {
      toast.error("OTP expired. Please request a new one.");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOTP(data);
      toast.success(response.message || "Email verified successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setCanResend(false);
      setTimer(120); // Reset timer to 2 minutes
      await resendOTP({ email: document.querySelector("[name=email]").value }); // Call API to resend OTP
      toast.success("New OTP sent to your email!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
      setCanResend(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Verify OTP</h2>

        <input {...register("email")} placeholder="Enter your email" className="w-full p-2 border rounded mb-2" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input {...register("otp")} placeholder="Enter OTP" className="w-full p-2 border rounded mb-2 text-center" maxLength="6" />
        <p className="text-red-500 text-sm">{errors.otp?.message}</p>

        <p className="text-gray-600 text-sm mb-2">
          Time remaining: <span className="font-semibold text-blue-600">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}</span>
        </p>

        <button type="submit" disabled={loading || timer <= 0} className={`w-full p-2 text-white rounded mt-2 ${timer > 0 ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"}`}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <button type="button" onClick={handleResendOTP} disabled={!canResend} className="w-full p-2 text-blue-500 mt-3 underline disabled:text-gray-400">
          Resend OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
