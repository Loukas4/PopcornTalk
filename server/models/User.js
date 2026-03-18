const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    displayName: {
        type: String,
        required: false, // Optional field for display name
        trim: true,     // Remove whitespace from both ends of the display name
    },
    email: {
        type: String,
        required: true, // Make email a required field
        unique: true,   // Ensure email uniqueness
        lowercase: true,// Convert email to lowercase before saving
        trim: true,     // Remove whitespace from both ends of the email
    },
    password: {
        type: String,   // Store hashed password
        required: true, // Make password a required field
    },
    age: {
        type: Number
    }
}, {
    timestamps: true,   // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('User', Schema);