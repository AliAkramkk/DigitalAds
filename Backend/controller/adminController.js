import Ad from "../models/adModel.js"; // Assuming you have an Ad model
import Notification from "../models/Notification.js"; // Assuming you have a Notification model
import Reward from "../models/rewardSchema.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";


export const getPendingAds = async (req, res) => {
    // console.log("Fetching pending ads"); // Debugging
    
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

export const getDashboardMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const totalAds = await Ad.countDocuments();
    const pendingAds = await Ad.countDocuments({ status: "pending" });

    const totalRewards = await Reward.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$rewardAmount" }
        }
      }
    ]);

    const totalPayments = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    const activeSubscriptions = await Payment.countDocuments({
      subscriptionExpiry: { $gt: new Date() },
      paymentStatus: "success"
    });

    res.json({
      totalUsers,
      totalCustomers,
      totalAdmins,
      totalAds,
      pendingAds,
      totalRewardsGiven: totalRewards[0]?.totalAmount || 0,
      totalPaymentsMade: totalPayments[0]?.totalAmount || 0,
      activeSubscriptions
    });
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    res.status(500).json({ message: "Error fetching dashboard metrics", error });
  }
};


// controllers/adminController.js

export const getPlanDistribution = async (req, res) => {
  try {
    const plans = await Payment.aggregate([
      { $match: { paymentStatus: "success" } },
      {
        $group: {
          _id: "$planType", // assuming `plan` is a string like "Basic", "Pro", etc.
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(plans);
  } catch (error) {
    console.error("Error getting plan distribution", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getUserCount = async(req, res) => {
  try {
    const userDetails = await User.find({ role: "user" });
    // console.log("User details:", userDetails); 
    

    // const customerCount = await User.countDocuments({ role: "customer" });
    // const adminCount = await User.countDocuments({ role: "admin" });

    res.json({
      userDetails
    });
  } catch (error) {
    console.error("Error getting user counts", error);
    res.status(500).json({ message: "Server error", error });
  }
}


// Block a user
export const blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User blocked successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Unblock a user
export const unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User unblocked successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET /admin/getcustomers
export const getCustomerDetails = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });

    const enrichedCustomers = await Promise.all(
      customers.map(async (customer) => {
        // Count ads posted
        const adsPosted = await Ad.countDocuments({ customer: customer._id });
// console.log("Customer ID:", customer._id, "Ads Posted:", adsPosted); // Debugging

        // Get the latest ACTIVE plan
        const activePlan = await Payment.findOne({
          customer: customer._id,
          paymentStatus: "success",
          subscriptionExpiry: { $gt: new Date() }
        })
          .sort({ subscriptionExpiry: -1 })
          .select("planType subscriptionExpiry");

        let planInfo;
// console.log("Active Plan:", activePlan); // Debugging

        if (activePlan) {
          planInfo = activePlan.planType;
        } else {
          // Get the most recent (even if expired) successful payment
          const lastExpiredPlan = await Payment.findOne({
            customer: customer._id,
            paymentStatus: "success",
          })
            .sort({ subscriptionExpiry: -1 })
            .select("planType subscriptionExpiry");

          if (lastExpiredPlan) {
            planInfo = `Expired (${lastExpiredPlan.planType} on ${lastExpiredPlan.subscriptionExpiry.toISOString().split('T')[0]})`;
          } else {
            planInfo = "No plan";
          }
        }

        return {
          ...customer.toObject(),
          adsPosted,
          plan: planInfo,
        };
      })
    );

    res.status(200).json({ customers: enrichedCustomers });
  } catch (error) {
    console.error("Error fetching customer details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

