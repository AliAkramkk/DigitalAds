import express from "express";
import { signup, verifyEmail, login, verifyOTP, resendOTP } from "../controller/authController.js";


const router = express.Router();

router.post("/signup", signup);
router.get("/verify-email", verifyEmail);   
router.post("/verify-otp", verifyOTP);  
router.post("/resend-otp", resendOTP);
router.post("/login", login);

export default router;