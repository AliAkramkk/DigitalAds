import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    
    audience: { 
      type: String, 
      enum: ["user", "customer"], 
      required: true 
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    published: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;