import { useState, useEffect } from "react";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { FaVideo, FaImage, FaTimes } from "react-icons/fa";
import CustomerNavbar from "../../components/customer/CustomerNavbar";
import { useNavigate } from "react-router-dom";
// import { Loader } from "lucide-react";

const Loader = () => (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
);

const AddAd = () => {
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blurb, setBlurb] = useState("");
  const [loading, setLoading] = useState(false);
  const [remainingFreeAds, setRemainingFreeAds] = useState(2);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch remaining free ad count
    axiosInstance
      .get("/customer/free-ads", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRemainingFreeAds(res.data.remainingFreeAds))
      .catch(() => setRemainingFreeAds(0));
  }, [token]);

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleRemoveFile = (setFile) => {
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
  
    setLoading(true);
  
    // if (remainingFreeAds === 0) {
    //   toast.error("Free ad limit reached! Please upgrade.");
    //   navigate("/payment");
    //   return;
    // }
  

    try {
      if (!video || !thumbnail || !title || !description || !blurb) {
        toast.error("Please fill all fields!");
        setLoading(false);
        return;
      }

      if (remainingFreeAds <= 0) {
        toast.info("Free uploads exhausted. Redirecting to payment...");
        navigate("/customer/payment");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("blurb", blurb);
      formData.append("video", video);
      formData.append("thumbnail", thumbnail);

      const response = await axiosInstance.post(
        "/customer/upload-ad",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      navigate("/customer/my-ads");
    } catch (error) {
      toast.error(error.message || "Failed to upload ad.");
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="animate-spin" size={32} />
  //     </div>
  //   );
  // }
  return (
    <>
      <CustomerNavbar />
      {loading && <Loader />} 
      <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg m-5">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Ad</h2>
        <div className="text-center font-semibold text-lg mb-4">
          {remainingFreeAds > 0 ? (
            <p className="text-green-600">
              You have {remainingFreeAds} free ad uploads left!
            </p>
          ) : (
            <p className="text-red-600 font-bold">
              Free uploads exhausted! Upgrade to reach more customers!
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4 relative">
              {video ? (
                <div className="relative w-full h-full">
                  <video
                    className="w-full h-full rounded-lg object-cover"
                    controls
                  >
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
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setVideo)}
                  />
                </label>
              )}
            </div>

            <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center relative">
              {thumbnail ? (
                <div className="relative w-full h-full">
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="Thumbnail"
                    className="w-full h-full rounded-lg object-cover"
                  />
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
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setThumbnail)}
                  />
                </label>
              )}
            </div>
          </div>

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
            <button
              onClick={handleSubmit}
              className="w-full p-3 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white"
            >
              Upload Ad
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAd;
