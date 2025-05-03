import express from 'express';
import {
  getLatestAds,
  getAdById,
  markAdWatchedFully,
  claimReward,
  postComment,
  getAdComments,
  getAdRating
} from "../controller/userController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/latest-ads", getLatestAds);
router.get("/ads/:id", protect, getAdById);
router.post("/ads/:id/mark-watched", protect, markAdWatchedFully);
router.post("/reward", protect, claimReward);
router.post("/ads/:id/comment", protect, postComment);
router.get("/ads/:id/comments", protect, getAdComments);
router.get("/ads/:id/rating", getAdRating);

export default router;
