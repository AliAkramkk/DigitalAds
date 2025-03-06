import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "ads",
      format: file.mimetype.startsWith("image") ? "png" : "mp4", // Auto-detect format
      resource_type: "auto",
    };
  },
});

const upload = multer({ storage });

export default upload;
