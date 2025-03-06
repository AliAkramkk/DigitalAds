import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are defined, check if the user has access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; // Redirect to unauthorized page
  }

  return <Outlet />; // Render the protected component
};

export default ProtectedRoute;