import cloudinary from "../config/cloudinary.js";
import Ad from "../models/adModel.js"; // Ad Schema
import Notification from "../models/Notification.js";
import  Payment from "../models/Payment.js";
import AdsView from "../models/AdViewSchema.js"
import Comment from "../models/CommentSchema.js";
import crypto from "crypto";
import Razorpay from "razorpay";
import User from "../models/User.js";
import dotenv from "dotenv";
import { log } from "console";
import mongoose from "mongoose";
import Inquiry from "../models/Inquiry.js";
import { sendEmail } from "../utils/email.js";

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
    const uploadedAdsCount = await Ad.countDocuments({
      customer: customerId,
      status: { $in: ["approved", "pending"] } // Or whatever logic you use
    });

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

export const getCustomerDashboardSummary = async (req, res) => {
  try {
    const customerId = req.user.userId;

    // Total ads uploaded
    const uploadedAdsCount = await Ad.countDocuments({ customer: customerId });

    // Watched ads count
   const watchedCountAggregation = await AdsView.aggregate([
      {
        $match: { watchedFully: true }
      },
      {
        $lookup: {
          from: "ads",
          localField: "ad",
          foreignField: "_id",
          as: "adData"
        }
      },
      { $unwind: "$adData" },
      {
        $match: {
          "adData.customer": new mongoose.Types.ObjectId(customerId)
        }
      },
      {
        $count: "watchedCount"
      }
    ]);

    const watchedCount = watchedCountAggregation[0]?.watchedCount || 0;

    const latestPayment = await Payment.findOne({
      customer: customerId,
      paymentStatus: "success",
    }).sort({ subscriptionStart: -1 });

    let planType = "Free";
    let adLimit = FREE_AD_LIMIT;
    let subscriptionExpiry = null;
    let daysRemaining = 0;

    if (latestPayment && latestPayment.subscriptionExpiry > new Date()) {
      planType = latestPayment.planType;
      adLimit += latestPayment.adLimit;
      subscriptionExpiry = latestPayment.subscriptionExpiry;

   const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

     const today = normalizeDate(new Date());
const expiry = normalizeDate(new Date(subscriptionExpiry));
daysRemaining = Math.max(Math.floor((expiry - today) / (1000 * 60 * 60 * 24)), 0);
    }

    const adsRemaining = Math.max(adLimit - uploadedAdsCount, 0);

     const comments = await Comment.find()
      .populate({
        path: 'ad',
        match: { customer: customerId },
        select: 'title'
      })
      .populate({ path: 'user', select: 'name' })
      .sort({ createdAt: -1 });

    const filteredComments = comments
      .filter(c => c.ad) // Remove comments on ads not owned by this user
      .map(c => ({
        adTitle: c.ad.title,
        comment: c.comment,
        rating: c.rating,
        createdAt: c.createdAt,
        userName: c.user.name
      }));

    res.status(200).json({
      uploadedAdsCount,
      watchedCount,
      adsRemaining,
      planType,
      subscriptionExpiry,
      daysRemaining,
       comments: filteredComments
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ message: "Server error", error: error.toString() });
  }
};

export const submitInquiry = async (req, res) => {
  console.log("Received inquiry request:", req.body);
  
  try {
    const { name, email, service, message, phone } = req.body;

    const newInquiry = new Inquiry({
      user: req.user.id,
      name,
      email,
      service,
      message,
      phone,
    });

    await newInquiry.save();

    // Compose email HTML
    const html = `
      <h3>New Customer Inquiry</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    // Send to admin or company email
    await sendEmail(process.env.NOTIFY_EMAIL, "New Customer Inquiry", html);

    res.status(201).json({ message: "Inquiry submitted successfully" });
  } catch (error) {
    console.error("Inquiry error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};