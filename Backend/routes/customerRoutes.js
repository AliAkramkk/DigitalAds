import express from "express";
import { uploadAd,getMyAds } from "../controller/customerController.js";
import upload from "../middleware/uploadMiddleware.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to upload ads (only accessible to customers)
router.post("/upload-ad", protect, upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]), uploadAd);
  router.get("/my-ads", protect, getMyAds);

export default router;
