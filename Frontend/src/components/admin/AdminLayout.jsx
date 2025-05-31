// components/admin/AdminLayout.jsx
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</div>
  </div>
);

export default AdminLayout;
