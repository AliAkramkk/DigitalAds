import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: " http://localhost:5173", // Adjust based on frontend URL
  credentials: true,
}));
app.use(cookieParser());

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/admin", adminRoutes);
  // app.use("/api/users", userRoutes);
  // app.use("/api/admin", authRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
