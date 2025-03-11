const Tutorial = require('../Model/tutorialSchema');

// ✅ Add a new tutorial (No Admin ID)
exports.addTutorial = async (req, res) => {
    try {
        const { title, category, videoId } = req.body;

        if (!title || !category || !videoId) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newTutorial = new Tutorial({
            title,
            category,
            videoId
        });

        await newTutorial.save();
        res.status(201).json({ message: "Tutorial added successfully", tutorial: newTutorial });
    } catch (error) {
        console.error("❌ Error adding tutorial:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getTutorials = async (req, res) => {
    try {
        const tutorials = await Tutorial.find();
        res.status(200).json(tutorials);
    } catch (error) {
        console.error("❌ Error fetching tutorials:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// ✅ Delete a tutorial
exports.deleteTutorial = async (req, res) => {
    try {
        const { id } = req.params;

        const tutorial = await Tutorial.findById(id);
        if (!tutorial) {
            return res.status(404).json({ message: "Tutorial not found" });
        }

        await Tutorial.findByIdAndDelete(id);
        res.status(200).json({ message: "Tutorial deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting tutorial:", error);
        res.status(500).json({ message: "Server error" });
    }
};
