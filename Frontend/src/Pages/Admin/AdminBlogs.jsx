import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Dialog } from "@headlessui/react";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminBlogs = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    audience: "user",
    category: "",
  });
  const [openConfirm, setOpenConfirm] = useState(false);

  const categoryOptions = {
    user: ["All", "Sports", "Career", "Personal Development"],
    customer: ["Business Growth", "Client Relations", "Staff Productivity", "Digital Presence", "Corporate Tips"]
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("title", formData.title);
    form.append("content", formData.content);
    form.append("audience", formData.audience);
    form.append("category", formData.category);
    if (formData.image) form.append("image", formData.image);

    try {
      await axiosInstance.post("/blogs/create", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Blog submitted!");
    } catch (err) {
      console.error(err);
    } finally {
      setOpenConfirm(false);
    }
  };

  return (
    <AdminLayout>
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Create Blog</h2>
      
      <input
        type="text"
        placeholder="Title"
        className="input input-bordered w-full mb-3"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <textarea
        placeholder="Content"
        className="textarea textarea-bordered w-full mb-3"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
      />

      <select
        className="select select-bordered w-full mb-3"
        value={formData.audience}
        onChange={(e) =>
          setFormData({ ...formData, audience: e.target.value, category: "" })
        }
      >
        <option value="user">User</option>
        <option value="customer">Customer</option>
      </select>

      <select
        className="select select-bordered w-full mb-3"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categoryOptions[formData.audience].map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="file"
        className="file-input file-input-bordered w-full mb-3"
        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
      />

      <button
        className="btn btn-primary border-2 border-black hover:bg-black hover:text-white rounded-md p-3"
        onClick={() => setOpenConfirm(true)}
      >
        Submit Blog
      </button>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <Dialog.Title className="text-lg font-bold">Confirm Submission</Dialog.Title>
            <p className="mt-2">Are you sure you want to publish this blog?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="btn btn-ghost border-2 p-2 m-2 rounded-md" onClick={() => setOpenConfirm(false)}>No</button>
              <button className="btn btn-success border-2 p-2 m-2 rounded-md" onClick={handleSubmit}>Yes</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
    </AdminLayout>
  );
};

export default AdminBlogs;
