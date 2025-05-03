import mongoose from "mongoose";

const AdViewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ad: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true },
    watchedFully: { type: Boolean, default: false },
    watchedAt: { type: Date, default: null },
  }, { timestamps: true });
  

  const AdView = mongoose.model("AdView", AdViewSchema);
  export default AdView;