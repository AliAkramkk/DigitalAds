    import mongoose from 'mongoose';

    const RewardSchema = new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        ad: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true },
        rewardAmount: { type: Number, required: true },
        rewardedAt: { type: Date, default: Date.now },
        earned: { type: Boolean, default: false },
      });
      
      const Reward = mongoose.model("Reward", RewardSchema); 
        export default Reward;