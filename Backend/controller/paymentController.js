import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
console.log("Razorpay Key ID1:", process.env.RAZORPAY_KEY_ID);

// ✅ 1. Create a Payment Order
export const createPayment = async (req, res) => {
    // console.log("Creating payment order:", req.body);
    
  try {
    const { plan, amount } = req.body;
    // console.log("Received amount:", amount, "Plan:", plan);

    const customerId = req.user.userId; // Assuming user ID is available in req.user

    if (!plan || !amount) {
      return res.status(400).json({ message: "Plan type and amount are required" });
    }

    // Calculate expiry date based on plan
    let expiryDate = new Date();
    if (plan === "daily") expiryDate.setDate(expiryDate.getDate() + 1);
    if (plan === "monthly") expiryDate.setMonth(expiryDate.getMonth() + 1);
    if (plan === "threeMonth") expiryDate.setMonth(expiryDate.getMonth() + 3);
    if (plan === "yearly") expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    // Create an order in Razorpay
    const shortId = crypto.randomBytes(4).toString("hex");  
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `order_${shortId}`,
    };
    const order = await razorpay.orders.create(options);

    res.json({ orderId: order.id, amount, plan, expiryDate });
  } catch (error) {
    console.error("Error in createPayment:", error);
res.status(500).json({ message: "Error creating payment", error: error.message });
  }
};

// ✅ 2. Verify Payment & Update Subscription
export const verifyPayment = async (req, res) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature, plan } = req.body;
      // console.log("Verifying payment:", req.body);
      const customerId = req.user.userId;
  
      // Validate input
      if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return res.status(400).json({ message: "Invalid payment data" });
      }
  
      // Verify Razorpay payment signature
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
  console.log("Expected Signature:", expectedSignature);
  
      if (expectedSignature !== razorpay_signature) {
        console.error("Error in verification Payment:", error);
        return res.status(400).json({ message: "Payment verification failed" });
      }
  
      // Calculate expiry date and ad limits
      let expiryDate = new Date();
      let adLimit = 0; // Number of ads allowed
  
      if (plan === "daily") {
        expiryDate.setDate(expiryDate.getDate() + 1);
        adLimit = 5;
      }
      if (plan === "monthly") {
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        adLimit = 50;
      }
      if (plan === "threeMonth") {
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        adLimit = 150;
      }
      if (plan === "yearly") {
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        adLimit = 500;
      }
  
      // Save payment record with adLimit
      const payment = await Payment.create({
        customer: customerId,
        planType: plan,
        amount: req.body.amount,
        transactionId: razorpay_payment_id,
        paymentStatus: "success",
        subscriptionStart: new Date(),
        subscriptionExpiry: expiryDate,
        adLimit,
      });
  
      // Update user's subscription details
      const user = await User.findById(customerId);
      if (user) {
        user.subscriptionPlan = plan;
        user.subscriptionExpiry = expiryDate;
        user.adLimit = adLimit; // Update user's ad limit
  
        await user.save();
      }
  
      res.json({ message: "Payment successful", payment });
    } catch (error) {
      console.error("Error in veification Payment:", error);
      res.status(500).json({ message: "Payment verification failed", error });
    }
  };
  