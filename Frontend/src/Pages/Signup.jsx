import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signupUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  role: yup.string().oneOf(["admin", "user", "customer"], "Invalid role").required("Role is required"),

  // Conditional validation for customer
  companyName: yup.string().when("role", (role, schema) =>
    role === "customer" ? schema.required("Company Name is required") : schema
  ),
  gstNumber: yup.string().when("role", (role, schema) =>
    role === "customer" ? schema.required("GST Number is required") : schema
  ),
});

const Signup = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const role = watch("role");

  // Reset companyName & gstNumber when role is changed
  useEffect(() => {
    if (role !== "customer") {
      setValue("companyName", "");
      setValue("gstNumber", "");
    }
  }, [role, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await signupUser(data);
      toast.success(response.message || "Signup successful!");
      setTimeout(() => navigate("/verify-otp"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Signup</h2>

        <input {...register("name")} placeholder="Name" className="w-full p-2 border rounded mb-2" disabled={loading} />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>

        <input {...register("email")} placeholder="Email" className="w-full p-2 border rounded mb-2" disabled={loading} />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input {...register("password")} type="password" placeholder="Password" className="w-full p-2 border rounded mb-2" disabled={loading} />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <select {...register("role")} className="w-full p-2 border rounded mb-2" disabled={loading}>
          <option value="">Select Role</option>
         
          <option value="user">User</option>
          <option value="customer">Customer</option>
        </select>
        <p className="text-red-500 text-sm">{errors.role?.message}</p>

        {role === "customer" && (
          <>
            <input {...register("companyName")} placeholder="Company Name" className="w-full p-2 border rounded mb-2" disabled={loading} />
            <p className="text-red-500 text-sm">{errors.companyName?.message}</p>

            <input {...register("gstNumber")} placeholder="GST Number" className="w-full p-2 border rounded mb-2" disabled={loading} />
            <p className="text-red-500 text-sm">{errors.gstNumber?.message}</p>
          </>
        )}

        <button type="submit" disabled={loading} className="w-full p-2 bg-blue-500 text-white rounded mt-2">
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
    </>
  );
};

export default Signup;
