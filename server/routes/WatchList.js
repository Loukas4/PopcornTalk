const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist'); // Import the Watchlist model

// POST Request to add a movie to the watchlist
router.post('/add', async (req, res) => {
    try {
        // 1. Receive data from the Frontend
        const { userId, movieId } = req.body;

        // Validate required fields
        if (!userId || !movieId) {
            return res.status(400).json({ message: 'userId and movieId are required' });
        }

        // 2. Check for duplicate entry
        const existing = await Watchlist.findOne({ userId, movieId });
        if (existing) {
            return res.status(409).json({ message: 'Movie is already in the watchlist' });
        }

        // 3. Create new watchlist entry using the Model
        const newEntry = new Watchlist({
            userId: userId,
            movieId: movieId,
        });

        // 4. Save the new entry to the database
        const savedEntry = await newEntry.save();

        // 5. Send a success response
        res.status(201).json({ message: 'Movie added to watchlist successfully', watchlistEntry: savedEntry });
    } catch (error) {
        // 6. Send an error response
        res.status(500).json({ message: 'Error adding movie to watchlist', error: error.message });
    }
});

// DELETE Request to remove a movie from the watchlist
router.delete('/remove', async (req, res) => {
    try {
        // 1. Receive data from the Frontend
        const { userId, movieId } = req.body;

        // Validate required fields
        if (!userId || !movieId) {
            return res.status(400).json({ message: 'userId and movieId are required' });
        }

        // 2. Find and delete the watchlist entry
        const deletedEntry = await Watchlist.findOneAndDelete({ userId, movieId });

        // 3. Check if the entry existed
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Movie not found in watchlist' });
        }

        // 4. Send a success response
        res.status(200).json({ message: 'Movie removed from watchlist successfully' });
    } catch (error) {
        // 5. Send an error response
        res.status(500).json({ message: 'Error removing movie from watchlist', error: error.message });
    }
});

// GET Request to retrieve the watchlist for a user
router.get('/user/:userId', async (req, res) => {
    try {
        // 1. Get userId from the request parameters
        const { userId } = req.params;

        // 2. Find all watchlist entries for the specified user
        const watchlist = await Watchlist.find({ userId: userId });

        // 3. Send the retrieved watchlist as a response
        res.status(200).json({ message: 'Watchlist retrieved successfully', watchlist: watchlist });
    } catch (error) {
        // 4. Send an error response
        res.status(500).json({ message: 'Error retrieving watchlist', error: error.message });
    }
});

module.exports = router; // Export the router to be used in the main server file (index.js)