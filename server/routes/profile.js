const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/profile/:userId
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('email age displayName');
        if (!user) return res.status(404).json({ message: 'User not found.' });

        res.status(200).json({
            email: user.email,
            displayName: user.displayName,
            age: user.age
        });
    } catch (err) {
        console.error('Get profile error:', err);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;