import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const blogStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "blogs", // Different folder for blogs
      format: file.mimetype.startsWith("image") ? "png" : "jpg",
      resource_type: "image", // Only allow images
    };
  },
});

const uploadBlogImage = multer({ storage: blogStorage });

export default uploadBlogImage;
