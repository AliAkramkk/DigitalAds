import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signupUser } from "../api/authApi";
import { useNavigate,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import signin from "../assets/Images/signin.jpg";
import HomeNavbar from "../components/HomeNavbar";

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
    .required("Phone is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: yup
    .string()
    .oneOf(["user", "customer"], "Invalid role")
    .required("Role is required"),

  companyName: yup
    .string()
    .when("role", (role, schema) =>
      role === "customer" ? schema.required("Company Name is required") : schema
    ),
  gstNumber: yup
    .string()
    .when("role", (role, schema) =>
      role === "customer" ? schema.required("GST Number is required") : schema
    ),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
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
      <HomeNavbar />
      <div className="min-h-screen   flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 h-full bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" p-28 rounded-lg "
        >
          <h2 className="text-xl md:text-4xl font-semibold mb-4 items-center font-mono text-blue-950">Signup Page</h2>

          <input
            {...register("name")}
            placeholder="Name"
            className="w-full p-2 border rounded mb-2"
            disabled={loading}
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>

          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
            disabled={loading}
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-2"
            disabled={loading}
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="Confirm Password"
             className="w-full p-2 border rounded mb-2"
            disabled={loading}
          />
          <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
          <input {...register("phone")} placeholder="Phone" className="w-full p-2 border rounded mb-2"
            disabled={loading} />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          <select
            {...register("role")}
            className="w-full p-2 border  rounded mb-2"
            disabled={loading}
          >
            <option value="" className="bg-lime-200 hover:bg-lime-400">Select Role</option>

            <option value="user" className="bg-lime-200 hover:bg-lime-400">User</option>
            <option value="customer" className="bg-lime-200 hover:bg-lime-400">Customer</option>
          </select>
          <p className="text-red-500 text-sm">{errors.role?.message}</p>

          {role === "customer" && (
            <>
              <input
                {...register("companyName")}
                placeholder="Company Name"
                className="w-full p-2 border rounded mb-2"
                disabled={loading}
              />
              <p className="text-red-500 text-sm">
                {errors.companyName?.message}
              </p>

              <input
                {...register("gstNumber")}
                placeholder="GST Number"
                className="w-full p-2 border rounded mb-2"
                disabled={loading}
              />
              <p className="text-red-500 text-sm">
                {errors.gstNumber?.message}
              </p>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-950 hover:bg-blue-900 text-white rounded mt-2"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
          <p className="md:text-lg font-thin">Already have an account?<span>  </span>
          <Link to='/login 'className="text-bold md:text-xl hover:text-blue-900">Login</Link>
          </p>
        </form>
        </div>
        <div className="hidden md:block md:w-1/2   bg-gradient-to-r from-blue-400 to-blue-800 text-white  bg-cover  h-screen"style={{
          backgroundImage: `url(${signin})`}}>
  <div className="flex flex-col items-center justify-center h-full text-start max-w-md mx-auto">
    <h1 className="text-4xl font-bold mb-4">Welcome to AdsView</h1>
    <p className="text-lg mb-2">
      Earn rewards while watching ads you care about, or promote your business by adding your ads.
    </p>
    <p className="text-lg mb-2">
      Join our community and make your time online more rewarding.
    </p>
    {/* <p className="text-lg"> */}
      {/** Optional: Different line for signin */}
      {/* Already have an account? Sign in and continue your journey!
    </p> */}
  </div>
</div>

      </div>
    </>
  );
};

export default Signup;
