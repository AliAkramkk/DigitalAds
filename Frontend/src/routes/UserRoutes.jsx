import { Routes, Route } from "react-router-dom";
import UserHome from "../Pages/User/UserHome";
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  )
}

export default UserRoutes