import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useSelector } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const PendingAds = () => {
  const user = useSelector((state) => state.auth.user);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedAd, setSelectedAd] = useState(null);
  const adsPerPage = 6;
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPendingAds = async () => {
      try {
        const response = await axiosInstance.get("/admin/pending-ads", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAds(response.data);
      } catch (error) {
        console.error("Error fetching pending ads:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingAds();
  }, [token]);

  const handleApprove = async (adId) => {
    try {
      await axiosInstance.post(`/admin/approve/${adId}`);
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== adId));
    } catch (error) {
      console.error("Error approving ad:", error);
    }
  };

  const handleReject = async () => {
    if (!selectedAd) return;
    try {
      await axiosInstance.post(`/admin/reject/${selectedAd}`, { reason: rejectReason });
      setAds((prevAds) => prevAds.filter((ad) => ad._id !== selectedAd));
      setRejectDialogOpen(false);
      setRejectReason("");
    } catch (error) {
      console.error("Error rejecting ad:", error);
    }
  };

  const openRejectDialog = (adId) => {
    setSelectedAd(adId);
    setRejectDialogOpen(true);
  };

  const closeRejectDialog = () => {
    setRejectDialogOpen(false);
    setRejectReason("");
  };

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

  if (loading) return <p>Loading pending ads...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Pending Ads</h1>
      {currentAds.length === 0 ? (
        <p className="text-center text-gray-600">No pending ads.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentAds.map((ad) => (
            <div key={ad._id} className="border rounded-lg p-4 shadow-md bg-white">
              <video controls className="w-full h-40 object-cover rounded">
                <source src={ad.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h3 className="text-lg font-bold mt-2">{ad.title}</h3>
              <p className="text-gray-600">{ad.description}</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                  onClick={() => handleApprove(ad._id)}
                >
                  Approve ✅
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => openRejectDialog(ad._id)}
                >
                  Reject ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded mr-2"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setCurrentPage((prev) => (indexOfLastAd < ads.length ? prev + 1 : prev))}
          disabled={indexOfLastAd >= ads.length}
        >
          Next
        </button>
      </div>

      {/* Reject Reason Dialog */}
      <Dialog open={rejectDialogOpen} onClose={closeRejectDialog}>
        <DialogTitle>Reject Ad</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Rejection Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRejectDialog} color="primary">Cancel</Button>
          <Button onClick={handleReject} color="secondary">Reject</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PendingAds;
