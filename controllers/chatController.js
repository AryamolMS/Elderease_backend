const Message = require('../Model/messageSchema');
const User = require("../Model/userSchema"); // Assuming you have a User model


// ✅ Save message to database (Only logged-in users can send messages)
exports.sendMessage = async (req, res) => {
    try {
        const { userId, sender, text } = req.body;

        if (!userId) {
            return res.status(403).json({ success: false, error: "Unauthorized: You must be logged in to send messages." });
        }

        // ✅ Debugging Log: Print incoming data
        console.log("Received message data:", { userId, sender, text });

        const message = new Message({ userId, sender, text });
        await message.save();

        res.status(201).json({ success: true, message });
    } catch (error) {
        console.error("❌ Error saving message:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};


// ✅ Fetch all messages (Admin Side)

// ✅ Fetch all messages and include usernames

exports.getMessages = async (req, res) => {
    try {
        const { userId } = req.params;

        // ✅ If no userId is provided, return messages from all users (For Admin)
        if (!userId) {
            console.log("✅ Admin requested all messages");
            const allMessages = await Message.find().sort({ timestamp: 1 }).lean();

            // ✅ Get unique user IDs from messages
            const uniqueUserIds = [...new Set(allMessages.map(msg => msg.userId))];

            // ✅ Fetch usernames for each userId
            const users = await User.find({ _id: { $in: uniqueUserIds } }, "username");

            // ✅ Create a mapping of userId -> username
            const userMap = {};
            users.forEach(user => {
                userMap[user._id] = user.username;
            });

            // ✅ Attach username to each message
            const messagesWithUsernames = allMessages.map(msg => ({
                ...msg,
                username: userMap[msg.userId] || "Unknown User",
            }));

            return res.status(200).json(messagesWithUsernames);
        }

        console.log(`✅ Fetching messages for user ID: ${userId}`);

        // ✅ Fetch messages for a single user (User View)
        const messages = await Message.find({ userId }).sort({ timestamp: 1 }).lean();

        res.status(200).json(messages);
    } catch (error) {
        console.error("❌ Error fetching messages:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.sendReply = async (req, res) => {
    try {
        const { userId, text } = req.body;

        if (!userId || !text) {
            return res.status(400).json({ error: "User ID and message text are required." });
        }

        console.log(`✅ Admin replying to user ${userId}: ${text}`);

        // ✅ Save the reply as a new message
        const replyMessage = new Message({
            userId,
            text,
            sender: "admin", // ✅ Mark this message as sent by the admin
            timestamp: new Date(),
        });

        await replyMessage.save();
        res.status(201).json({ message: "Reply sent successfully" });
    } catch (error) {
        console.error("❌ Error sending reply:", error);
        res.status(500).json({ error: error.message });
    }
};








