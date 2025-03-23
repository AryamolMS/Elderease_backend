const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(' ')[1]; // Extract the token part

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Use environment variable
        req.user = decoded; // Attach decoded token data to request
        console.log("🟢 Decoded User:", req.user); // ✅ Debugging
        next();
    } catch (error) {
        console.error("❌ JWT Verification Error:", error.message);
        res.status(403).json({ error: "Invalid token" });
    }
}; 

/* const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Remove 'Bearer ' prefix

  if (!token) return res.status(401).json({ message: "Access Denied. No Token Provided." });

  try {
    console.log("Received Token:", token);
    console.log("JWT Secret Key:", process.env.JWT_SECRET);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified Token Data:", verified);

    req.user = verified;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    res.status(400).json({ message: "Invalid Token" });
  }
};


 */