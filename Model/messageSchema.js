const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Stores the user ID or username
    sender: String,  // "User" or "Admin"
    text: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
