const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    tmdbId: { //Νέο όνομα του movieId
        type: Number,      // Το ID από το εξωτερικό API (π.χ. TMDB)
        required: true,
        unique: true       // Δεν θέλουμε την ίδια ταινία δύο φορές
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    posterPath: {
        type: String,      // Το URL για την αφίσα της ταινίας
        required: false
    },
    releaseDate: {
        type: String       // Ημερομηνία κυκλοφορίας
    },
    voteAverage: {
        type: Number,      // Βαθμολογία (π.χ. 8.5)
        default: 0
    },
    genres: {
        type: [String],    // Πίνακας με κατηγορίες (π.χ. ["Action", "Sci-Fi"])
        default: []
    }
}, {
    timestamps: true       // Πότε προστέθηκε η ταινία στη βάση μας
});

module.exports = mongoose.model('Movie', MovieSchema);