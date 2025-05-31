import {Routes ,Route} from "react-router-dom"
import AdminDashbord from "../Pages/Admin/AdminDashbord"
import PendingAds from "../Pages/Admin/PendingAds"
import UserList from "../Pages/Admin/UserList"

const AdminRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<AdminDashbord />} />
    <Route path="/pending-ad" element={<PendingAds />} />
    <Route path="/user-list" element={<UserList />} />
    
    </Routes>
  )
}

export default AdminRoutes