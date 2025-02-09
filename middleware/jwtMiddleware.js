const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), "your_secret_key"); // Use your actual secret key
        req.user = decoded; // Now req.user contains { id, role }
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
};
