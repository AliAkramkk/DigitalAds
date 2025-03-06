import {Routes ,Route} from "react-router-dom"
import AdminDashbord from "../Pages/Admin/AdminDashbord"

const AdminRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<AdminDashbord />} />
    
    </Routes>
  )
}

export default AdminRoutes