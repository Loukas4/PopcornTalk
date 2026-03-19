const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    tmdbId: {
        type: Number, // Το ID από το TMDB (π.χ. 27205)
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Σύνδεση με τον χρήστη που το έγραψε
        required: true
    },
    username: String, // Προαιρετικά, για να μην κάνουμε συνέχεια αναζήτηση
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);