import cloudinary from "../config/cloudinary.js";
import Ad from "../models/adModel.js"; // Ad Schema
import Notification from "../models/Notification.js";
import  Payment from "../models/Payment.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import User from "../models/User.js";
import dotenv from "dotenv";
import { log } from "console";
dotenv.config();

export const uploadAd = async (req, res) => {
  // console.log("hii from customer add contorller");
 

  try {
    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title, description, blurb } = req.body;
    const videoUrl = req.files.video[0].path;
    const thumbnailUrl = req.files.thumbnail[0].path;
    const customerId = req.user.userId; 

    const newAd = new Ad({
      title,
      description,
      blurb,
      videoUrl,
      thumbnailUrl,
      customer: customerId, // Assuming user is authenticated
      status: "pending",
    });
    console.log("New Ad Object:", newAd);

    await newAd.save();

    res.status(201).json({ message: "Ad uploaded successfully, awaiting approval", ad: newAd });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
  
};


export const getMyAds = async (req, res) => {
  try {
    const customerId = req.user.userId;

    // Fetch all ads belonging to the customer
    const ads = await Ad.find({ customer: customerId }).lean();

    // Fetch notifications related to rejected ads
    const notifications = await Notification.find({ user: customerId }).lean();

    // Attach rejection reason to rejected ads
    const updatedAds = ads.map((ad) => {
      if (ad.status === "rejected") {
        // Find the rejection notification for this ad
        const rejectionNotification = notifications.find((notif) =>
          notif.message.includes(ad.title) && notif.message.includes("rejected")
        );

        return {
          ...ad,
          rejectionReason: rejectionNotification ? rejectionNotification.message : "No reason provided",
        };
      }
      return ad;
    });

    res.status(200).json(updatedAds);
  } catch (error) {
    console.error("Error fetching ads:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNotifications = async (req, res) => {

  
  try {
   
    
    const notifications = await Notification.find({ user: req.user.userId }).sort({ createdAt: -1 });
  
    
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const markNotificationsAsRead = async (req, res) => {
  try {
    const customerId = req.user.userId; // Ensure correct userId

    const result = await Notification.updateMany(
      { user: customerId, isRead: false }, // Find unread notifications
      { $set: { isRead: true } } // Set them as read
    );

    // console.log("Updated Notifications:", result);

    res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error updating notifications:", error);
    res.status(500).json({ error: "Failed to mark notifications as read" });
  }
};

const FREE_AD_LIMIT = 2;

export const getRemainingFreeAds = async (req, res) => {
  try {
    const customerId = req.user.userId;

    // Count how many ads the user has uploaded
    const uploadedAdsCount = await Ad.countDocuments({ customer: customerId });

    // Fetch the latest valid subscription
    const latestPayment = await Payment.findOne({
      customer: customerId,
      paymentStatus: "success",
      subscriptionExpiry: { $gt: new Date() }, // Not expired
    }).sort({ subscriptionStart: -1 });

    let remainingFreeAds = FREE_AD_LIMIT;
    let subscription = null;

    if (latestPayment) {
      const { planType, adLimit, subscriptionExpiry } = latestPayment;

      // Total ads allowed: free + subscription-based
      const totalAllowed = FREE_AD_LIMIT + adLimit;
      const remaining = Math.max(totalAllowed - uploadedAdsCount, 0);

      remainingFreeAds = remaining;

      subscription = {
        planType,
        adLimit,
        subscriptionExpiry,
      };
    } else {
      // No active subscription, limit to free ads
      remainingFreeAds = Math.max(FREE_AD_LIMIT - uploadedAdsCount, 0);
    }

    res.json({
      remainingFreeAds,
      subscription,
    });
  } catch (error) {
    console.error("Error in getRemainingFreeAds:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });


// console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
// console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);



// export const initiatePayment = async (req, res) => {
//   // console.log("Initiating payment:", req.body);
  
//   const { amount, plan } = req.body;
//   try {
//     const options = {
//       amount: amount * 100, // Razorpay accepts amount in paise
//       currency: "INR",
//       receipt: `order_rcpt_${Date.now()}`,
//     };

//     if (!razorpay) {
//       console.error("❌ Razorpay instance is not initialized!");
//       return res.status(500).json({ message: "Razorpay instance not initialized" });
//     }

// // console.log("razorpay instance initialized",razorpay);

//     const order = await razorpay.orders.create(options);
//     // console.log("Order created:", order);
    
//     res.json({ orderId: order.id });
//   } catch (error) {
//     res.status(500).json({ message: "Payment initiation failed", error });
//   }
// };

// // Verify payment and update ad limit
// export const verifyPayment = async (req, res) => {
//   // console.log("Verifying payment:", req.body);
  
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

//   const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
//   hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
//   const digest = hmac.digest("hex");

//   if (digest !== razorpay_signature) {
//     return res.status(400).json({ message: "Invalid payment signature" });
//   }

//   // Find user and update their ad limit
//   const user = await User.findById(req.user.userId);
//   if (!user) return res.status(404).json({ message: "User not found" });

//   if (plan === "daily") user.adLimit += 1;
//   if (plan === "monthly") user.adLimit += 10;
//   if (plan === "three-month") user.adLimit += 30;
//   if (plan === "yearly") user.adLimit += 50;

//   await user.save();

//   res.json({ message: "Payment successful, ad limit updated!" });
// };


