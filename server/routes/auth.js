const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); //Import the User model

//POST Request for user registration
router.post('/register', async (req, res) => {
    try {
        // 1. Receive data from the Frontend
        const { displayName, email, password } = req.body;

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            // Send status 400 (Bad Request) if user is found
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // 3. Hash the password
        // The salt adds randomness to the encryption (cost factor of 10) for maximum security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create new user using the Model
        const newUser = new User({
            displayName: displayName,
            email: email,
            password: hashedPassword
        });

        // 5. Save the new user to the database (MongoDB)
        await newUser.save();

        // 6. Send success response to the Frontend (status 201: Created)
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        // Log the error to the server console for debugging
        console.error('Error during registration:', error);

        // Send a generic error message to the user
        res.status(500).json({ message: 'Error registering user', error });
    }
});

router.post('/login', async (req, res) => {
    try {
        //1. Receive data from the Frontend
        const { email, password } = req.body;

        //2. Check if user exists in the database
        const user = await User.findOne({ email: email });
        if (!user) {
            // Send status 400 (Bad Request) if user is not found
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //3. Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Send status 400 (Bad Request) if password does not match
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //4. Send success response to the Frontend (status 200: OK)
        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        // Log the error to the server console for debugging
        console.error('Error during login:', error);

        // Send a generic error message to the user
        res.status(500).json({ message: 'Error logging in', error });
    }
});

// Export the router so index.js can import and use it
module.exports = router;