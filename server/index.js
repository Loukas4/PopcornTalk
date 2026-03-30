require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios'); // Μεταφέρθηκε ψηλά με τα υπόλοιπα imports

const app = express();
// Χρησιμοποιούμε την 3000 όπως την όρισες, αλλά βεβαιώσου ότι η React δεν τρέχει στην ίδια!
const port = process.env.PORT || 3000; 

// --- Middleware ---
app.use(cors());
app.use(express.json()); 

// --- Σύνδεση στη MongoDB ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch(err => console.error("❌ Could not connect to MongoDB", err));

// --- Import Routes ---
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const watchlistRoutes = require('./routes/Watchlist');
const watchedMoviesRoutes = require('./routes/watchedMovies');

// --- Χρήση External Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/watchedMovies', watchedMoviesRoutes);

// --- Movie Routes (TMDB API) ---

// 1. Endpoint για Αναζήτηση Ταινιών
app.get('/api/movies/search', async (req, res) => {
    try {
        const { query, page = 1 } = req.query;
        const apiKey = process.env.TMDB_API_KEY;

        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }

        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: apiKey,
                query: query,
                page: page,
                language: 'el-GR'
            }
        });

        res.json(response.data.results);
    } catch (error) {
        console.error("TMDB Search Error:", error.message);
        res.status(500).json({ error: "Search failed" });
    }
});

// 2. Endpoint για Δημοφιλείς Ταινίες (Αρχική Σελίδα)
app.get('/api/movies/popular', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const apiKey = process.env.TMDB_API_KEY;

        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
            params: { 
                api_key: apiKey, 
                page: page, 
                language: 'el-GR' 
            }
        });

        res.json(response.data.results);
    } catch (error) {
        console.error("TMDB Popular Error:", error.message);
        res.status(500).json({ error: "Failed to fetch popular movies" });
    }
});

// --- Test Route ---
app.get('/', (req, res) => {
    res.send('🍿 PopcornTalk Backend is running!');
});

// --- Start Server ---
app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
});