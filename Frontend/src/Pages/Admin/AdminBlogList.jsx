import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Blogs</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/create-blog")}
          >
            ➕ Create Blog
          </button>
        </div>

        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 mb-3 rounded shadow">
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-sm text-gray-500">Audience: {blog.audience}</p>
            <p>{blog.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminBlogList;
