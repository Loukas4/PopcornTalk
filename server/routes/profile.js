const express = require('express');
const router = express.Router();
const requireApiKey = require('../middleware/auth');

// GET /profile - Protected route
router.get('/profile', requireApiKey, (req, res) => {
    const { password, apiKey, ...profileData } = req.user.toObject();
    res.status(200).json({
        message: 'Profile retrieved successfully',
        user: profileData
    });
});

module.exports = router;