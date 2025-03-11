const Contact = require('../Model/contactSchema');

// Create a new contact submission
exports.createContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();
        
        res.status(201).json({ message: "Message submitted successfully", contact: newContact });
    } catch (error) {
        console.error("❌ Error in createContact:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

