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
