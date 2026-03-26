const express = require('express');
const router = express.Router();
const WatchedMovie = require('../models/WatchedMovie'); //Import the WatchedMovie model

//POST Request to add a watched movie
router.post('/add', async (req, res) => {
    try {
        // 1. Receive data from the Frontend
        const { userId, movieId, rating, review } = req.body;

        // Validate required fields
        if (!userId || !movieId || !rating) {
            return res.status(400).json({ message: 'userId, movieId, and rating are required' });
        }

        // 2. Create new watched movie entry using the Model
        const newWatchedMovie = new WatchedMovie({
            userId: userId,
            movieId: movieId,
            rating: rating,
            review: review
        });

        // 3. Save the new watched movie entry to the database
        const savedWatchedMovie = await newWatchedMovie.save();

        // 4. Send a success response
        res.status(201).json({ message: 'Watched movie added successfully', watchedMovie: savedWatchedMovie });
    } catch (error) {
        // 5. Send an error response
        res.status(500).json({ message: 'Error adding watched movie', error: error.message });
    }
});

//GET Request to retrieve watched movies for a user
router.get('/user/:userId', async (req, res) => {
    try {
        // 1. Get userId from the request parameters
        const { userId } = req.params;

        // 2. Find all watched movies for the specified user
        const watchedMovies = await WatchedMovie.find({ userId: userId });

        // 3. Send the retrieved watched movies as a response
        res.status(200).json({ message: 'Watched movies retrieved successfully', watchedMovies: watchedMovies });
    } catch (error) {
        // 4. Send an error response
        res.status(500).json({ message: 'Error retrieving watched movies', error: error.message });
    }
});

//GET Request to retrieve all watched movies (Community Feed)
router.get('/feed', async (req, res) => {
    try {
        // 1. Find all watched movies from all users
        const watchedMovies = await WatchedMovie.find();
 
        // 2. Send the retrieved watched movies as a response
        res.status(200).json({ message: 'Community feed retrieved successfully', watchedMovies: watchedMovies });
    } catch (error) {
        // 3. Send an error response
        res.status(500).json({ message: 'Error retrieving community feed', error: error.message });
    }
});

module.exports = router; //Export the router to be used in the main server file (index.js)