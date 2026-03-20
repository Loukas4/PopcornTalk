require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

// Profile Router
const profileRouter = require('./routes/profile');

const app = express();
const port = process.env.PORT || 3000;

// Import routes
const authRoutes = require('./routes/auth');
const watchedMoviesRoutes = require('./routes/watchedMovies');

const profileRoutes = require('./routes/profile')

// Middleware
app.use(cors());
app.use(express.json());    // For parsing JSON bodies
app.use('/api/auth', authRoutes);// Use auth routes for any requests to /auth
app.use('/api/watched-movies', watchedMoviesRoutes); // Use watched movies routes for any requests to /watched-movies
app.use('/api/profile', profileRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Could not connect to MongoDB", err));


// Test route
app.get('/', (req, res) => {
    res.send('Hello from your Node.js server with Express!');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


