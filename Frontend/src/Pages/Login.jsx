import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser } from "../api/authApi";
import { useNavigate,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import { getDashboardRoute } from "../utils/routeHelper";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import signin from "../assets/Images/signin.jpg";
import {auth,googleProvider} from '../features/firebase';
import { signInWithPopup } from "firebase/auth";
import HomeNavbar from "../components/HomeNavbar";
import { loginUserWithGoogle } from "../api/authApi";

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

const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Send to backend for JWT and DB user creation if needed
    const response = await loginUserWithGoogle({
      name: user.displayName,
      email: user.email,
      profileImage: user.photoURL,
      googleUid: user.uid,
    });

    dispatch(loginSuccess({ user: response.user, token: response.token }));
    toast.success("Logged in with Google!");
    navigate(getDashboardRoute(response.user.role));
  } catch (error) {
    console.error("Google Login Error:", error);
    toast.error("Google login failed. Please try again.");
  }
};
  return (
    <>
 <HomeNavbar />
      <div className="min-h-screen   flex flex-col md:flex-row items-center justify-center">
      <div className="hidden md:block md:w-1/2   bg-gradient-to-r from-blue-400 to-blue-800 text-white  bg-cover  h-screen"style={{
               backgroundImage: `url(${signin})`}}>
       <div className="flex flex-col items-center justify-center h-full text-start max-w-md mx-auto">
         <h1 className="text-4xl font-bold mb-4">Welcome Back to AdsView</h1>
    <p className="text-lg mb-2">
      Ready to earn rewards by watching ads you care about?
    </p>
    <p className="text-lg mb-2">
      Or manage and track your ads to reach your customers efficiently.
    </p>
    <p className="text-lg">
      Login to continue your rewarding journey with AdsView.
    </p>
       </div>
     </div>
     <div className="md:w-1/2 h-full bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white  rounded-lg shadow-lg md:p-28 h-screen">
        <h2 className="md:text-4xl font-semibold text-blue-950 mb-4 text-center">Login Page</h2>

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
          className={`w-full p-2 rounded mt-2 text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-950 hover:bg-blue-900"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
  type="button"
  onClick={handleGoogleLogin}
  className="w-full p-2 rounded mt-2 mb-2 bg-red-500 text-white hover:bg-red-600"
>
  Continue with Google
</button>
         <p className="md:text-lg font-thin">Don't have an account?<span>  </span>
                  <Link to='/signUp 'className="text-bold md:text-xl hover:text-blue-900">SignUp</Link>
                  </p>
      </form>
      </div>
    </div>
    </>
  );
};

export default Login;
