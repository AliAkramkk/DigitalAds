import Ad from "../models/adModel.js"; // Assuming you have an Ad model
import Notification from "../models/Notification.js"; // Assuming you have a Notification model
// Get pending ads for approval
export const getPendingAds = async (req, res) => {
    console.log("Fetching pending ads"); // Debugging
    
  try {
    const ads = await Ad.find({ status: "pending" });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending ads", error });
  }
};

// Approve an ad
// 

export const approveAd = async (req, res) => {
  try {
    const { adId } = req.params;
    const ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    ad.status = "approved";
    await ad.save();

    // Create a notification for the customer
    await Notification.create({
      user: ad.customer,
      message: `Your ad "${ad.title}" has been approved! 🎉`,
    });

    res.json({ message: "Ad approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Reject Ad with a Reason
export const rejectAd = async (req, res) => {
  try {
    const { adId } = req.params;
    const { reason } = req.body; // Get rejection reason from frontend
    const ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    ad.status = "rejected";
    await ad.save();

    // Create a notification for the customer
    await Notification.create({
      user: ad.customer,
      message: `Your ad "${ad.title}" was rejected. Reason: ${reason}`,
    });

    res.json({ message: "Ad rejected successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};