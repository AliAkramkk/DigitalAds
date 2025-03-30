import express from "express";
import { getPendingAds, approveAd, rejectAd } from "../controller/adminController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js"; // Ensure only admins can access

const router = express.Router();

router.get("/pending-ads", protect, isAdmin, getPendingAds);
router.post("/approve/:adId", protect, isAdmin, approveAd);
router.post("/reject/:adId", protect, isAdmin, rejectAd);


export default router;
