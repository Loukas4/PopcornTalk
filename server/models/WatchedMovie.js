const mongoose = require('mongoose');// Import Mongoose library to define the schema and model for WatchedMovie

// Define the schema for WatchedMovie
const watchedMovieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Movie model
        ref: 'Movie',
        required: true
    }
});