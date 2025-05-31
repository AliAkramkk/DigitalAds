import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { getDashboardRoute } from "../utils/routeHelper";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur", // Validate fields when they lose focus
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.auth.user);

  // Redirect user if already logged in
  // useEffect(() => {
  //   if (user) {
  //     navigate(getDashboardRoute(user.role));
  //   }
  // }, [user, navigate]);

 const onSubmit = async (data) => {
  setLoading(true);
  try {
    const response = await loginUser(data.email, data.password);

    dispatch(loginSuccess({ user: response.user, token: response.token })); 
    toast.success(response.message);

    setTimeout(() => {
      navigate(getDashboardRoute(response.user.role));
    }, 500);

  } catch (error) {
    const errorMessage = error.response?.data?.message || "❌ Login failed. Please try again.";
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};
  return (
    <>
     <Navbar />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
     
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        {/* Email Field */}
        <input 
          {...register("email")} 
          placeholder="Email" 
          className={`w-full p-2 border rounded mb-2 ${errors.email ? "border-red-500" : "border-gray-300"}`} 
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Password Field */}
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`w-full p-2 border rounded mb-2 ${errors.password ? "border-red-500" : "border-gray-300"}`}
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded mt-2 text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
    </>
  );
};

export default Login;
