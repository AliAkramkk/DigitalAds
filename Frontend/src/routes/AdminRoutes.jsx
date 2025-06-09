import {Routes ,Route} from "react-router-dom"
import AdminDashbord from "../Pages/Admin/AdminDashbord"
import PendingAds from "../Pages/Admin/PendingAds"
import UserList from "../Pages/Admin/UserList"
import AdminBlogs from "../Pages/Admin/AdminBlogs"
import AdminBlogList from "../Pages/Admin/AdminBlogList"

const AdminRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<AdminDashbord />} />
    <Route path="/pending-ad" element={<PendingAds />} />
    <Route path="/user-list" element={<UserList />} />
    <Route path="/create-blog" element={<AdminBlogs />} />
    <Route path="/blogs" element={<AdminBlogList/>} />
    
    </Routes>
  )
}

export default AdminRoutes