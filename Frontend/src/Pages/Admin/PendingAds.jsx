import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const PendingAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingAds = async () => {
      try {
        const response = await axiosInstance.get("/admin/pending-ads"); // Get all pending ads
        setAds(response.data.ads);
      } catch (error) {
        console.error("Error fetching pending ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingAds();
  }, []);

  const handleApprove = async (adId) => {
    try {
      await axiosInstance.put("/admin/approve-ad", { adId, status: "approved" });
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== adId));
    } catch (error) {
      console.error("Error approving ad:", error);
    }
  };

  const handleReject = async (adId) => {
    try {
      await axiosInstance.put("/admin/approve-ad", { adId, status: "rejected" });
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== adId));
    } catch (error) {
      console.error("Error rejecting ad:", error);
    }
  };

  if (loading) return <p>Loading pending ads...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Pending Ads</h1>
      {ads.length === 0 ? (
        <p>No pending ads.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad._id} className="border rounded-lg p-4 shadow">
              <img src={ad.thumbnailUrl} alt={ad.title} className="w-full h-40 object-cover rounded" />
              <h3 className="text-lg font-bold mt-2">{ad.title}</h3>
              <p className="text-gray-600">{ad.description}</p>

              <div className="flex gap-2 mt-4">
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleApprove(ad._id)}>
                  Approve ✅
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleReject(ad._id)}>
                  Reject ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingAds;
