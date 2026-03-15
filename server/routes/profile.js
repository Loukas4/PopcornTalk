// GET /api/profile/userId
// Return only email
router.get('/userId', async (req, res) => {
    try {
        
        const user = await User.findById(req.params.userId).select('email');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Return ID, email
        res.status(200).json({
            id: user._id,
            email: user.email
        });
    } catch (err) {
        console.error('Get profile error:', err);
        res.status(500).json({ message: 'Server error.' });
    }
});