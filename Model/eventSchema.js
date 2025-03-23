const mongoose = require('mongoose');
const validator = require('validator');
 const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [3, 'Title must be at least 3 characters long']
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= new Date(); // Ensures date is in the future
            },
            message: 'Event date must be in the future'
        }
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isURL(value); // Ensures the input is a valid URL
            },
            message: 'Invalid event link'
        }
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        required: true
    },
    approved: {
        type: Boolean,
        default: false // Default to pending
    },
    rejected: {
        type: Boolean,
        default: false // Default to pending
    }
}, { timestamps: true });

// Create Model
const Event = mongoose.model('events', eventSchema);

// Export Model
module.exports = Event;


