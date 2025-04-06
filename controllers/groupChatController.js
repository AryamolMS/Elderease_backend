const GroupMessage = require("../Model/groupMessageSchema");
const User = require("../Model/userSchema");

// ✅ Send group message
exports.sendGroupMessage = async (req, res) => {
  const { userId, sender, text } = req.body;

  if (!userId || !sender || !text) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const message = new GroupMessage({
      userId,
      sender,
      text,
    });

    await message.save();
    res.status(201).json({ success: true, message });
  } catch (error) {
    console.error("Error saving group message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// ✅ Get all group messages
exports.getGroupMessages = async (req, res) => {
  try {
    const messages = await GroupMessage.find()
      .sort({ createdAt: 1 })
      .populate("userId", "username"); // Get usernames

    const formattedMessages = messages.map(msg => ({
      _id: msg._id,
      userId: msg.userId._id,
      username: msg.userId.username,
      text: msg.text,
      createdAt: msg.createdAt
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error("❌ Error fetching group messages:", error);
    res.status(500).json({ error: error.message });
  }
};
