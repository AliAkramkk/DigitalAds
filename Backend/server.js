import dotenv from "dotenv";
import http from "http";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { Server as SocketIOServer } from "socket.io";
import axios from "axios"


// Import Routes
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
// Load environment variables

// Initialize Express App
const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://shimmering-capybara-84a6ef.netlify.app",
];

const io = new SocketIOServer(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

// Set up OpenAI

const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_API_KEY;
// Socket.IO logic
io.on("connection", (socket) => {
  console.log("📡 Visitor connected:", socket.id);

  socket.on("user-message", async (msg) => {
    try {
      // Call the working Hugging Face model
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/distilgpt2",
        { inputs: msg },
        {
          headers: {
            Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Get the generated text
      const botReply = response.data[0]?.generated_text || "Sorry, I didn't get that.";
      socket.emit("admin-reply", botReply);
    } catch (error) {
      console.error("Error fetching Hugging Face response:", error?.response?.data || error.message);
      socket.emit("admin-reply", "Sorry, I'm having trouble responding right now.");
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Visitor disconnected:", socket.id);
  });
});
// Middleware
app.use(express.json());



app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(cookieParser());

// Connect to Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/blogs", blogRoutes);
  

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

