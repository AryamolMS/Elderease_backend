const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    console.log("🟢 Received Token:", token);
    console.log("🔑 JWT Secret Key Used for Verification:", process.env.JWT_SECRET);

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure this matches the signing secret
        console.log("✅ Decoded Token:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("❌ Invalid Token Error:", error.message);
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
