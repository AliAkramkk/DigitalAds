import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
    planType: {
      type: String,
      enum: ["daily", "monthly", "three-month", "yearly"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String, // Razorpay Payment ID
      required: true,
      unique: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    subscriptionStart: {
      type: Date, // When the subscription starts
      default: Date.now,
    },
    subscriptionExpiry: {
      type: Date, // Expiry date calculated based on plan
      required: true,
    },
    adLimit: {
        type: Number, // Number of ads allowed for this payment
        required: true,
      },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
