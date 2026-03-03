const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

//POST Request for Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate Input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save User
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Respond with user info (excluding password)
        res.status(201).json({
            message: 'User registered successfully.',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
