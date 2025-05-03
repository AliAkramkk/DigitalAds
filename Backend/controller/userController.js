import User from "../models/User.js";
import Ad from "../models/adModel.js";
import AdView from "../models/AdViewSchema.js";
import Reward from "../models/rewardSchema.js";
import Comment from "../models/CommentSchema.js";

// ✅ Fetch latest ads
export const getLatestAds = async (req, res) => {
  try {
    const ads = await Ad.find({ status: "approved" }).sort({ createdAt: -1 }).limit(6);
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ads", error });
  }
};

// ✅ Get ad by ID
export const getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (!ad) return res.status(404).json({ message: "Ad not found" });
    res.status(200).json(ad);
  } catch (err) {
    res.status(500).json({ message: "Error fetching ad", error: err.message });
  }
};

// ✅ Mark ad watched
export const markAdWatchedFully = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { adId } = req.body;

    let view = await AdView.findOne({ user: userId, ad: adId });

    if (!view) {
      view = new AdView({ user: userId, ad: adId, watchedFully: true });
    } else {
      view.watchedFully = true;
    }

    await view.save();
    res.status(200).json({ message: "Ad marked as fully watched" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Claim reward
export const claimReward = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { adId } = req.body;

    const view = await AdView.findOne({ user: userId, ad: adId });

    if (!view || !view.watchedFully) {
      return res.status(403).json({ message: "Ad not fully watched." });
    }

    const existingReward = await Reward.findOne({ user: userId, ad: adId });
    if (existingReward && existingReward.earned) {
      return res.status(400).json({ message: "Reward already claimed." });
    }

    const rewardAmount = 10;
    const reward = new Reward({
      user: userId,
      ad: adId,
      rewardAmount,
      earned: true,
    });
    await reward.save();

    await User.findByIdAndUpdate(userId, {
      $inc: {
        totalAdsWatched: 1,
        totalRewardEarned: rewardAmount,
      },
    });

    res.status(201).json({ message: "Reward claimed!", reward });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Post comment
export const postComment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { comment, rating } = req.body;
    const adId = req.params.id;

    const view = await AdView.findOne({ user: userId, ad: adId });

    if (!view || !view.watchedFully) {
      return res.status(403).json({ message: "You must watch the ad fully to comment." });
    }

    const newComment = new Comment({ user: userId, ad: adId, comment, rating });
    await newComment.save();

    res.status(201).json({ message: "Comment submitted!", comment: newComment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Get comments
export const getAdComments = async (req, res) => {
  try {
    const comments = await Comment.find({ ad: req.params.id })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments", error: err.message });
  }
};

// ✅ Get average rating
export const getAdRating = async (req, res) => {
  try {
    const ratings = await Comment.find({ ad: req.params.id }).select("rating");
    const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const average = ratings.length === 0 ? 0 : sum / ratings.length;
    res.json({ averageRating: average.toFixed(1) });
  } catch (err) {
    res.status(500).json({ message: "Failed to get rating", error: err.message });
  }
};
