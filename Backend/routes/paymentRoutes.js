import express from "express";
import { createPayment, verifyPayment } from "../controller/paymentController.js";
import { protect } from "../middleware/authMiddleware.js"; // Ensures only logged-in users can pay

const router = express.Router();

// Create a payment order
router.post("/create-payment", protect, createPayment);

// Verify payment and update subscription
router.post("/verify-payment", protect, verifyPayment);

export default router;
