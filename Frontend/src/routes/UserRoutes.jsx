import { Routes, Route } from "react-router-dom";
import UserHome from "../Pages/User/UserHome";
import AdViewPage from "../Pages/User/AdViewPage";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/ads/:id" element={<AdViewPage />} />

      {/* <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  )
}

export default UserRoutes