import { useState } from 'react';

function App() {
const [searchTerm, setSearchTerm] = useState("");

const movies = [
    {
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    description: "Two imprisoned men bond over a number of years...",
    poster_url: "/shawsankredemption.jpg"
    },
    {
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    description: "The aging patriarch of organized crime dynasty...",
    poster_url: "/thegodfather.jpg"
    },
    {
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    description: "When the menace known as the Joker wreaks havoc...",
    poster_url: "/thedarkknight.jpg"
    },
    {
    title: "Schindler's List",
    year: 1993,
    genre: ["Biography", "Drama", "History"],
    description: "In German-occupied Poland during WWII, industrialist Oskar Schindler becomes concerned for his workforce.",
    poster_url: "/Schindlers_List.jpg"
    },
    {
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    description: "The lives of two mob hitmen, a boxer, and a gangster's wife intertwine in four tales.",
    poster_url: "/Pulp_fiction.jpg"
    },
    {
    title: "Inception",
    year: 2010,
    genre: ["Action", "Adventure", "Sci-Fi"],
    description: "A thief who steals secrets through dream-sharing technology is given the inverse task.",
    poster_url: "/Inception.png"
    },
    {
    title: "Fight Club",
    year: 1999,
    genre: ["Drama"],
    description: "An insomniac office worker and a soap maker form an underground fight club.",
    poster_url: "/FightClub.jpg"
    },
    {
    title: "LOTR: Return of the King",
    year: 2003,
    genre: ["Action", "Adventure"],
    description: "Gandalf and Aragorn lead the World of Men against Sauron's army.",
    poster_url: "/LOTR.jpg"
    },
    {
    title: "Forrest Gump",
    year: 1994,
    genre: ["Drama", "Romance"],
    description: "The history of the US unfolds from the perspective of an Alabama man.",
    poster_url: "/ForestGump.jpg"
    },
    {
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    description: "A computer hacker learns about the true nature of his reality.",
    poster_url: "/TheMatrix.jpg"
    },
    {
    title: "Goodfellas",
    year: 1990,
    genre: ["Biography", "Crime"],
    description: "The story of Henry Hill and his life in the mob.",
    poster_url: "/Goodfellas.jpg"
    },
    {
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama"],
    description: "A farmer and ex-NASA pilot is tasked to pilot a spacecraft to save humanity.",
    poster_url: "/Interstellar.jpg"
    },
    {
    title: "Parasite",
    year: 2019,
    genre: ["Drama", "Thriller"],
    description: "Greed and class discrimination threaten a newly formed symbiotic relationship.",
    poster_url: "/Parasite.jpg"
    }
];

const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10 pb-20 relative font-sans text-gray-900">
    
      {/* BACKGROUND POPCORN */}
    <div className="fixed inset-0 bg-[url('/popcornimage.png')] bg-repeat bg-[length:150px] opacity-10 mix-blend-multiply pointer-events-none z-0"></div>

    <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center">
        
    <div className="text-center mb-10">
        <h1 className="text-6xl font-black mb-2 drop-shadow-xl">🍿 PopcornTalk 🍿</h1>
        <p className="text-gray-800 text-xl font-bold tracking-widest uppercase">MOVIES JUST FOR YOU!</p>
    </div>

        {/* SEARCH BAR */}
    <div className="w-full max-w-2xl flex shadow-2xl rounded-full overflow-hidden bg-white p-2 border border-gray-300 mb-16">
        <input
            type="text"
            placeholder="Search for a movie..."
            className="flex-grow px-6 py-3 text-gray-700 focus:outline-none text-lg bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">SEARCH</button>
    </div>

        {/* RESPONSIVE GRID */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {filteredMovies.map((movie, index) => (
    <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col border border-gray-100 text-left transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl cursor-pointer">

        {/* IMAGE ON TOP */}
        <img src={movie.poster_url} alt={movie.title} className="w-full h-80 object-cover" />

        {/* CONTENT BELOW */}
    <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black mb-1 text-gray-900 leading-tight">{movie.title}</h3>
        <p className="text-indigo-600 font-bold text-xs mb-3 uppercase">{movie.year} • {movie.genre[0]}</p>
        <p className="text-gray-600 text-sm italic line-clamp-3">"{movie.description}"</p>
    </div>
    </div>
        ))}
        </div>

        {filteredMovies.length === 0 && (
        <p className="text-2xl font-bold text-gray-400 mt-10">No movies found... 🎬</p>
        )}

    </div>
    </div>
);
}

export default App;