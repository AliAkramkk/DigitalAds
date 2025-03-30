import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    blurb:{
      type: String,
      required: true,
      trim: true,
    } ,
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Ad", adSchema);
