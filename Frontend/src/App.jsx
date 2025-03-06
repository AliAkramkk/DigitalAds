import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";

import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import VerifyOTP from "./Pages/VerifyOTP";
import AdminDashbord from "./Pages/Admin/AdminDashbord";
import CustomerRoutes from "./routes/CustomerRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
<>
<ToastContainer position="top-right" autoClose={3000} />
    <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path ="/verify-otp" element={<VerifyOTP />} />

      
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/*" element={<UserRoutes />} />
        </Route>
      <Route
        path="/admin-dashboard"
        element={<ProtectedRoute element={<AdminDashbord />} allowedRoles={["admin"]} />}
      />
     <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/customer/*" element={<CustomerRoutes />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Route>
    </Routes>
  </Router>
  </>
);
}

export default App
