require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Προτείνω bcryptjs για ευκολία στα Windows
const axios = require('axios');

// Εισαγωγή των Models
const User = require('./models/User');
const Movie = require('./models/Movie');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Σύνδεση με τη MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Επιτυχής σύνδεση στη MongoDB'))
.catch(err => console.error('❌ Σφάλμα σύνδεσης MongoDB:', err));

// --- ROUTES ---

// 1. ΤΕΣΤ ΔΙΑΔΡΟΜΗ
app.get('/', (req, res) => {
    res.send('PopcornTalk Backend Server is Running!');
});

// 2. REGISTER (ΕΓΓΡΑΦΗ ΧΡΗΣΤΗ)
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, age } = req.body;

        // Κρυπτογράφηση κωδικού (Hashing)
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            age
        });

        await newUser.save();
        res.status(201).json({ message: 'Ο χρήστης δημιουργήθηκε με επιτυχία!' });
    } catch (err) {
        res.status(400).json({ error: 'Το email υπάρχει ήδη ή τα στοιχεία είναι λάθος' });
    }
});

// 3. LOGIN (ΣΥΝΔΕΣΗ ΧΡΗΣΤΗ)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Ο χρήστης δεν βρέθηκε' });
        }

        // Έλεγχος αν ο κωδικός ταιριάζει
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Λάθος κωδικός πρόσβασης' });
        }

        res.json({ 
            message: 'Επιτυχής σύνδεση!', 
            user: { id: user._id, email: user.email } 
        });
    } catch (err) {
        res.status(500).json({ error: 'Σφάλμα διακομιστή' });
    }
});

// 4. TMDB MOVIE SEARCH (ΑΝΑΖΗΤΗΣΗ ΤΑΙΝΙΩΝ)
app.get('/api/movies/search', async (req, res) => {
    try {
        const query = req.query.query;
        const apiKey = process.env.TMDB_API_KEY;

        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: apiKey,
                query: query,
                language: 'el-GR'
            }
        });

        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: 'Αποτυχία ανάκτησης ταινιών από το TMDB' });
    }
});

const Comment = require('./models/Comment');

app.post('/api/comments', async (req, res) => {
    try {
        const { movieId, userId, username, text } = req.body;
        
        const newComment = new Comment({
            movieId,
            userId,
            username,
            text
        });

        await newComment.save();
        res.status(201).json({ message: "Το σχόλιο δημοσιεύτηκε!" });
    } catch (err) {
        res.status(500).json({ error: "Αποτυχία δημοσίευσης σχολίου" });
    }
});


// Εκκίνηση Server
app.listen(port, () => {
    console.log(`🚀 Ο Server τρέχει στη θύρα ${port}`);
});