const mongoose = require("mongoose");

const groupMessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" }, // ✅ Matches model name
  sender: String,
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("GroupMessage", groupMessageSchema);
