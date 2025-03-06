import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    let token = req.headers.authorization;
    
    console.log("Headers Received:", req.headers); // Debugging
  
    if (!token || !token.startsWith("Bearer ")) {
      console.log("No valid token found"); // Debugging
      return res.status(401).json({ message: "Unauthorized, no token" });
    }
  
    token = token.split(" ")[1]; // Extract token
    // console.log("Extracted Token:", token); // Debugging
  
    try {
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log("Decoded Token:", decoded); // Debugging
      req.user = decoded;
      next();
    } catch (error) {
      console.log("Token Verification Failed:", error.message);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
  