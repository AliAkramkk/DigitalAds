import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
import CustomerNavbar from "../../components/customer/CustomerNavbar";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axiosInstance.get("/customer/my-ads");
        console.log("Fetched ads:", response.data); // Debugging
        setAds(response.data); // Ensure this matches the API response
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <>
      <CustomerNavbar />

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">My Ads</h1>
        {ads.length === 0 ? (
          <p>No ads uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <div key={ad._id} className="border rounded-lg p-4 shadow">
                <img
                  src={ad.thumbnailUrl}
                  alt={ad.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-bold mt-2">{ad.title}</h3>
                <p className="text-gray-600">{ad.description}</p>

                <p
                  className={`mt-2 font-semibold ${
                    ad.status === "approved"
                      ? "text-green-600"
                      : ad.status === "rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {ad.status === "approved"
                    ? "Approved ✅"
                    : ad.status === "rejected"
                    ? `Rejected ❌ - ${
                        ad.rejectionReason || "No reason provided"
                      }`
                    : "Pending Approval ⏳"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyAds;
