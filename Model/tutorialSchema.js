const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    videoId: { type: String, required: true }, // YouTube Video ID
}, { timestamps: true });

module.exports = mongoose.model("Tutorial", tutorialSchema);
