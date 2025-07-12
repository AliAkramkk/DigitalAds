import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
phone: { type: String,  trim: true },
    // ✅ Role-based Access
    role: { type: String, enum: ["admin", "user", "customer"], default: "user" },

    // ✅ Customer-specific fields
    companyName: { 
      type: String, 
      default: null, 
      required: function () { return this.role === "customer"; } 
    },
    gstNumber: { 
      type: String, 
      default: null, 
      required: function () { return this.role === "customer"; } 
    },

    isBlocked: { type: Boolean, default: false },


    // ✅ Email Verification (OTP-based)
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },

    // ✅ Password Reset
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },

    // ✅ Profile
    profileImage: { type: String, default: "" },

    // ✅ Last Login Timestamp
    lastLogin: { type: Date },

    totalAdsWatched: { type: Number, default: 0 },
    totalRewardEarned: { type: Number, default: 0 }
  },
  { timestamps: true },

 
);

const User = mongoose.model("User", UserSchema);
export default User;
