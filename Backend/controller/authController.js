import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken, generateVerificationToken , verifyToken } from "../utils/jwt.js";
import { sendEmail } from "../utils/email.js";

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const signup = async (req, res) => {
  console.log("hlo from signup");
  
  const { name, email, password,phone , role, companyName, gstNumber } = req.body;
console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    if (role === "customer" && (!companyName || !gstNumber)) {
      return res.status(400).json({ message: "Company Name and GST Number are required for customers" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP(); // Generate a 6-digit OTP
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      isVerified: false,
      otp,
      otpExpires,
      companyName: role === "customer" ? companyName : undefined,
      gstNumber: role === "customer" ? gstNumber : undefined,
    });

    // Send OTP via email
    await sendEmail(
      user.email,
      "Verify Your Email - OTP",
      `<p>Your OTP for email verification is: <strong>${otp}</strong></p>`
    );

    res.status(201).json({
      message: "User registered! Check your email for OTP verification.",
      userId: user._id,
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified) return res.status(400).json({ message: "Email already verified" });

    if (user.otp !== otp || new Date() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = undefined; // Remove OTP after verification
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: "Email verified successfully!" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  export const verifyEmail = async (req, res) => {
    const { token } = req.query;
  
    try {
      const decoded = verifyToken(token);
      if (!decoded) return res.status(400).json({ message: "Invalid or expired token" });
  
      const user = await User.findOne({ verificationToken: token });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      user.isVerified = true;
      user.verificationToken = undefined; // Remove the token after verification
      await user.save();
  
      res.json({ message: "Email verified successfully!" });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  export const resendOTP = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      if (user.isVerified) return res.status(400).json({ message: "Email already verified" });
  
      // Generate a new OTP
      const otp = generateOTP();
      user.otp = otp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
      await user.save();
  
      // Send OTP via email
      await sendEmail(
        user.email,
        "Resend OTP - Verify Your Email",
        `<p>Your new OTP for email verification is: <strong>${otp}</strong></p>`
      );
  
      res.json({ message: "New OTP sent successfully!" });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      if (!user.isVerified) return res.status(403).json({ message: "Please verify your email first" });
  
      // Generate JWT Token
        if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account has been blocked. Please contact support.",
      });
    }
      const token = generateToken(user);
      // console.log("Generated Token:", token); // DEBUGGING LINE
  
      res.status(200).json({
        message: " Login successful",
        token,
        user: { id: user._id, name: user.name,email:user.email, role: user.role },
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
export const googleLogin = async (req, res) => {
  console.log("hlo from google login");
  
  try {
    const { name, email, profileImage, googleUid } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: googleUid, // store UID hashed if you wish
        role: "user",
        isVerified: true,
        profileImage,
      });
    }

    const token = generateToken(user)

    res.status(200).json({
      message: "Logged in successfully with Google",
      user,
      token,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ message: "Google login failed" });
  }
};