import express from 'express';
import {
  getLatestAds,
  getAdById,
  markAdWatchedFully,
  claimReward,
  postComment,
  getAdComments,
  getAdRating,
  getUserStats,
  getBlogs
} from "../controller/userController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/latest-ads", getLatestAds);
router.get("/ads/:id", protect, getAdById);
router.get("/ads/:id/comments", protect, getAdComments);
router.get("/ads/:id/rating", getAdRating);
router.get("/stats", protect, getUserStats);
router.get("/blogs", getBlogs);


router.post("/ads/:id/mark-watched", protect, markAdWatchedFully);
router.post("/reward", protect, claimReward);
router.post("/ads/:id/comment", protect, postComment);


export default router;
