import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
  // console.log("Headers Received in Protect Middleware:", req.headers); // Debugging

    let token = req.headers.authorization;
    
    // Debugging
  
    if (!token || !token.startsWith("Bearer ")) {
   // Debugging
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
  
  export const isAdmin = (req, res, next) => {
    // console.log("User in isAdmin Middleware:", req.user);
  
    if (!req.user) {
      console.log("No user found in request");
      return res.status(401).json({ message: "Unauthorized, no user data" });
    }
  
    if (req.user.role === "admin") {
      console.log("Admin access granted");
      next(); // Allow access
    } else {
      console.log("Admin access denied");
      res.status(403).json({ message: "Forbidden, admin access required" });
    }
  };
  