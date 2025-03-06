import { useState } from "react";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { FaVideo, FaImage, FaTimes } from "react-icons/fa";
import CustomerNavbar from "../../components/customer/CustomerNavbar";
const AddAd = () => {
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blurb, setBlurb] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleRemoveFile = (setFile) => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple clicks
    setLoading(true);

    try {
      if (!video || !thumbnail || !title || !description || !blurb) {
        toast.error("Please fill all fields!");
        setLoading(false);
        return;
      }


      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("blurb", blurb);
      formData.append("video", video);
      formData.append("thumbnail", thumbnail);
  
      // Upload to Cloudinary
      const response = await axiosInstance.post("/customer/upload-ad", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message || "Failed to upload ad.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <CustomerNavbar />
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg m-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Ad</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Video & Thumbnail Upload */}
        <div className="flex flex-col items-center">
          {/* Video Upload */}
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4 relative">
            {video ? (
              <div className="relative w-full h-full">
                <video className="w-full h-full rounded-lg object-cover" controls>
                  <source src={URL.createObjectURL(video)} type="video/mp4" />
                </video>
                <button
                  onClick={() => handleRemoveFile(setVideo)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <FaVideo className="text-gray-500 text-6xl" />
                <span className="text-sm mt-2">Upload Video</span>
                <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileChange(e, setVideo)} />
              </label>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center relative">
            {thumbnail ? (
              <div className="relative w-full h-full">
                <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" className="w-full h-full rounded-lg object-cover" />
                <button
                  onClick={() => handleRemoveFile(setThumbnail)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <FaTimes />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <FaImage className="text-gray-500 text-6xl" />
                <span className="text-sm mt-2">Upload Thumbnail</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, setThumbnail)} />
              </label>
            )}
          </div>
        </div>

        {/* Right Side: Ad Details */}
        <div>
          <input
            type="text"
            placeholder="Ad Title"
            className="w-full p-3 border rounded-lg mb-4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg mb-4 h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            placeholder="Blurb (Short catchy line)"
            className="w-full p-3 border rounded-lg mb-4 h-16"
            value={blurb}
            onChange={(e) => setBlurb(e.target.value)}
          />

          {/* Upload Button with Loading State */}
          <button
            onClick={handleSubmit}
            className={`w-full p-3 rounded-lg font-semibold ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Please wait, it is updating..." : "Upload Ad"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddAd;
