import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ad: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true },
    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    createdAt: { type: Date, default: Date.now }
  });

  const Comment = mongoose.model("Comment", CommentSchema);
  export default Comment;