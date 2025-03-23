const Event = require('../Model/eventSchema');

 exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, link } = req.body;
        const userId = req.user?.userId; 

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: Login required" });
        }

        if (!title || !description || !date || !link) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newEvent = new Event({
            title,
            description,
            date,
            link,
            createdBy: userId,
            approved: false, // ✅ Ensuring events are pending by default
            rejected: false
        });

        await newEvent.save();
        console.log("✅ Event Successfully Saved:", newEvent);

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("❌ Error in createEvent:", error.message);
        res.status(500).json({ error: error.message });
    }
}; 




exports.getAllEvents = async (req, res) => {
    try {
        console.log("🔹 Fetching all events...");
        const events = await Event.find().populate('createdBy', 'username email');
        console.log("🟢 Events Fetched Successfully:", events.length);

        res.status(200).json({ events });
    } catch (error) {
        console.error("❌ Error fetching events:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllEventsForAdmin = async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'username email');
        res.status(200).json({ events });
    } catch (error) {
        console.error("❌ Error fetching events:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.approveEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findByIdAndUpdate(eventId, { approved: true, rejected: false }, { new: true });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        console.log("✅ Event Approved:", event);
        res.status(200).json({ message: "Event approved successfully", event });
    } catch (error) {
        console.error("❌ Error approving event:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({ approved: false, rejected: false });
        res.status(200).json(events);
    } catch (error) {
        console.error("❌ Error fetching pending events:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getApprovedEvents = async (req, res) => {
    try {
        const approvedEvents = await Event.find({ approved: true })
            .populate({
                path: "createdBy",
                select: "username email"
            });

        if (!approvedEvents || approvedEvents.length === 0) {
            return res.status(404).json({ message: "No approved events found" });
        }

        console.log("✅ Approved Events Fetched:", approvedEvents);
        res.status(200).json(approvedEvents);
    } catch (error) {
        console.error("❌ Error fetching approved events:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.getRejectedEvents = async (req, res) => {
    try {
        const rejectedEvents = await Event.find({ rejected: true }).populate('createdBy', 'username email');
        res.status(200).json(rejectedEvents);
    } catch (error) {
        console.error("❌ Error fetching rejected events:", error);
        res.status(500).json({ message: "Server error" });
    }
};


exports.rejectEvent = async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findByIdAndUpdate(eventId, { rejected: true, approved: false }, { new: true });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        console.log("❌ Event Rejected:", event);
        res.status(200).json({ message: "Event rejected successfully", event });
    } catch (error) {
        console.error("❌ Error rejecting event:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getPendingEvents = async (req, res) => {
    try {
        const pendingEvents = await Event.find({ approved: false, rejected: false })
            .populate("createdBy", "username email");

        if (!pendingEvents.length) {
            return res.status(404).json({ message: "No pending events found" });
        }

        console.log("✅ Pending Events Fetched:", pendingEvents.length);
        res.status(200).json(pendingEvents);
    } catch (error) {
        console.error("❌ Error fetching pending events:", error);
        res.status(500).json({ message: "Server error" });
    }
};

