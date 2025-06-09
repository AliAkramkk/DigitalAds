import express from "express";
import { getPendingAds, approveAd, rejectAd,getDashboardMetrics,getUserCount,blockUser, unblockUser,getCustomerDetails } from "../controller/adminController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js"; // Ensure only admins can access

const router = express.Router();

router.get("/pending-ads", protect, isAdmin, getPendingAds);
router.get("/dashboard-details", protect, isAdmin, getDashboardMetrics);
router.get("/", protect, isAdmin, getDashboardMetrics);
router.get("/getUser", protect, isAdmin, getUserCount);
router.get("/getcustomers", protect, isAdmin, getCustomerDetails);
router.post("/approve/:adId", protect, isAdmin, approveAd);
router.post("/reject/:adId", protect, isAdmin, rejectAd);
router.patch("/blockUser/:id", protect, isAdmin, blockUser);
router.patch("/unblockUser/:id", protect, isAdmin, unblockUser);


export default router;
