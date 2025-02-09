const Event = require('../Model/eventSchema');


exports.createEvent = async (req, res) => {
    console.log("🔹 Received request at /api/events");

    try {
        // ✅ Fix: Get the logged-in user's ID correctly
        const userId = req.user.userId; // Ensure userId is extracted correctly

        console.log("🟢 Authenticated User ID:", userId); // ✅ Debugging step

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: Login required" });
        }

        const { title, description, date, link } = req.body;

        if (!title || !description || !date || !link) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newEvent = new Event({
            title,
            description,
            date,
            link,
            createdBy: userId // ✅ Store the logged-in user's ID
        });

        await newEvent.save();
        console.log("✅ Event Successfully Saved:", newEvent); // ✅ Debugging

        res.status(201).json({ message: "Event created successfully", event: newEvent });

    } catch (error) {
        console.error("❌ Error in createEvent:", error.message);
        res.status(500).json({ error: error.message });
    }
};




exports.getAllEvents = async (req, res) => {
    try {
        console.log("🔹 Fetching all events...");

        // ✅ Fetch events & populate createdBy with name and email
        const events = await Event.find().populate('createdBy', 'username email');

        console.log("🟢 Events Fetched Successfully:", events.length); // ✅ Debugging count

        if (!events || events.length === 0) {
            console.log("❌ No events found.");
            return res.status(404).json({ message: "No events found." });
        }

        res.status(200).json({ events });
    } catch (error) {
        console.error("❌ Error fetching events:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



exports.getAllEventsForAdmin = async (req, res) => {
    try {
        const events = await Event.find()
            .populate('createdBy', 'name email'); // ✅ Fetch name & email from User

        res.status(200).json({ events });
    } catch (error) {
        console.error("❌ Error fetching events:", error);
        res.status(500).json({ message: "Server error" });
    }
};



exports.approveEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findByIdAndUpdate(eventId, { approved: true }, { new: true });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json({ message: "Event approved successfully", event });
    } catch (error) {
        console.error("Error approving event:", error);
        res.status(500).json({ message: "Server error" });
    }
};
