import cloudinary from "../config/cloudinary.js";
import Ad from "../models/adModel.js"; // Ad Schema

export const uploadAd = async (req, res) => {
  // console.log("hii from customer add contorller");
  console.log("User in request:", req.user);

  console.log("Request files:", req.files);

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
    const customerId = req.user.userId; // Get user ID from auth middleware

    const ads = await Ad.find({ customer: customerId });

    if (!ads || ads.length === 0) {
      return res.status(404).json({ message: "No ads found" });
    }

    res.status(200).json(ads);
  } catch (error) {
    console.error("Error fetching ads:", error);
    res.status(500).json({ message: "Server error" });
  }
};