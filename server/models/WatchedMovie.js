const mongoose = require('mongoose');// Import Mongoose library to define the schema and model for WatchedMovie

// Define the schema for WatchedMovie
const watchedMovieSchema = new mongoose.Schema({
    // Reference to the User who watched the movie
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',                          // Establishes a relationship with the User model
        required: true
    },
    // Reference to the Movie that was watched
    movieId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Movie model
        ref: 'Movie',
        required: true
    },
    rating: {
        type: Number, // User's rating for the movie (e.g., 1-5)
        required: true,
        min: 1,       // Minimum rating value
        max: 5        // Maximum rating value
    },
    review: {
        type: String, // User's review or comments about the movie
        required: false, // Review is optional
        trim: true,     // Remove whitespace from both ends of the review
        maxLength: 500 // Limit review length to 500 characters
    },
    watchedAt: {
        type: Date,   // Date when the movie was watched
        default: Date.now // Default to current date and time
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('WatchedMovie', watchedMovieSchema); // Export the WatchedMovie model based on the defined schema