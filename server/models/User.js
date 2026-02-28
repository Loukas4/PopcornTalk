const mongoose = require('mongoose');

const Schema = mongoose.Schema({
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
}, {
    timestamps: true,   // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('User', Schema);