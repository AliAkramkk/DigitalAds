import express from "express";
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog } from "../controller/blogController.js";
import uploadBlogImage from "../middleware/uploadBlogImage.js"; // cloudinary image upload middleware
import { protect } from "../middleware/authMiddleware.js"; // you may already have this

const router = express.Router();

// Admin routes
router.get("/", protect, getAllBlogs);
router.get("/:id", protect, getBlogById);
router.post("/create", protect, uploadBlogImage.single("image"), createBlog);
router.put("/:id", protect, uploadBlogImage.single("image"), updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
