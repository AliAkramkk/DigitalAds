import {Routes ,Route} from "react-router-dom"
import AdminDashbord from "../Pages/Admin/AdminDashbord"
import PendingAds from "../Pages/Admin/PendingAds"

const AdminRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<AdminDashbord />} />
    <Route path="/pending-ad" element={<PendingAds />} />
    
    </Routes>
  )
}

export default AdminRoutes