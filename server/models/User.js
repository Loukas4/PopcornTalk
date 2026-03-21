const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        unique: true, // Because it is necessary other users not use the same Name
        required: false, // Optional field for display name
        trim: true,     // Remove whitespace from both ends of the display name
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true, // Make email a required field
        unique: true,   // Ensure email uniqueness
        lowercase: true,// Convert email to lowercase before saving
        trim: true,     // Remove whitespace from both ends of the email
        max: 50
    },
    password: {
        type: String,   // Store hashed password
        required: true, // Make password a required field
        min: 6
    },
    age: {
        type: Number
    },
    profilePicture:{
        type: String,
        default: ""
    },
    coverPicture:{
        type: String, 
        default: ""
    }
}, {
    timestamps: true,   // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);