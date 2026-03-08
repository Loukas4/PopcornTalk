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
description: "The aging patriarch of an organized crime dynasty...",
poster_url: "/thegodfather.jpg"
},
{
title: "The Dark Knight",
year: 2008,
genre: ["Action", "Crime", "Drama"],
description: "When the menace known as the Joker wreaks havoc...",
poster_url: "thedarkknight.jpg"
},
{
    "title": "Schindler's List",
    "year": 1993,
    "genre": ["Biography", "Drama", "History"],
    "director": "Steven Spielberg",
    "description": "In German-occupied Poland during WWII, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce.",
    "poster_url": "/Schindlers_List.jpg",
    "runtime": 195,
    "top_review": "A masterpiece of humanity in the darkest times. 10/10"
},
{
    "title": "Pulp Fiction",
    "year": 1994,
    "genre": ["Crime", "Drama"],
    "director": "Quentin Tarantino",
    "description": "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    "poster_url": "/Pulp_fiction.jpg",
    "runtime": 154,
    "top_review": "The coolest movie ever made. Revolutionary dialogue!"
},
{
    "title": "Inception",
    "year": 2010,
    "genre": ["Action", "Adventure", "Sci-Fi"],
    "director": "Christopher Nolan",
    "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    "poster_url": "/Inception.png",
    "runtime": 148,
    "top_review": "A mind-bending journey that keeps you guessing until the end."
},
{
    "title": "Fight Club",
    "year": 1999,
    "genre": ["Drama"],
    "director": "David Fincher",
    "description": "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    "poster_url": "/FightClub.jpg",
    "runtime": 139,
    "top_review": "Gritty, smart, and completely unexpected. Rule #1: Watch it."
},
{
    "title": "The Lord of the Rings: The Return of the King",
    "year": 2003,
    "genre": ["Action", "Adventure", "Drama"],
    "director": "Peter Jackson",
    "description": "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom.",
    "poster_url": "/LOTR.jpg",
    "runtime": 201,
    "top_review": "The perfect conclusion to the greatest trilogy in cinema history."
},
{
    "title": "Forrest Gump",
    "year": 1994,
    "genre": ["Drama", "Romance"],
    "director": "Robert Zemeckis",
    "description": "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75.",
    "poster_url": "/ForestGump.jpg",
    "runtime": 142,
    "top_review": "Life is like a box of chocolates... and this movie is the best one."
},
{
    "title": "The Matrix",
    "year": 1999,
    "genre": ["Action", "Sci-Fi"],
    "director": "Lana & Lilly Wachowski",
    "description": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    "poster_url": "/TheMatrix.jpg",
    "runtime": 136,
    "top_review": "It changed science fiction forever. Visuals and philosophy combined."
},
{
    "title": "Goodfellas",
    "year": 1990,
    "genre": ["Biography", "Crime", "Drama"],
    "director": "Martin Scorsese",
    "description": "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his mob partners.",
    "poster_url": "/Goodfellas.jpg",
    "runtime": 145,
    "top_review": "The ultimate mob movie. Brutal, fast-paced, and brilliant."
},
{
    "title": "Interstellar",
    "year": 2014,
    "genre": ["Adventure", "Drama", "Sci-Fi"],
    "director": "Christopher Nolan",
    "description": "When Earth becomes uninhabitable, a farmer and ex-NASA pilot is tasked to pilot a spacecraft, along with a team of researchers.",
    "poster_url": "/Interstellar.jpg",
    "runtime": 169,
    "top_review": "A visual masterpiece about love and time. Emotional and epic."
},
{
    "title": "Parasite",
    "year": 2019,
    "genre": ["Drama", "Thriller"],
    "director": "Bong Joon Ho",
    "description": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    "poster_url": "/Parasite.jpg",
    "runtime": 132,
    "top_review": "A brilliant social commentary that shifts genres effortlessly."
}
];

const filteredMovies = movies.filter(movie =>
movie.title.toLowerCase().includes(searchTerm.toLowerCase())
);

return (

<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-10 pb-20 relative font-sans text-gray-900">

<div className="fixed inset-0 bg-[url('/popcornimage.png')] bg-repeat bg-[length:150px] opacity-10 mix-blend-multiply pointer-events-none z-0"></div>

<div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">

<div className="text-center mb-10">
<h1 className="text-6xl font-black mb-2 drop-shadow-xl">🍿 PopcornTalk 🍿</h1>
<p className="text-gray-800 text-xl font-bold tracking-widest uppercase">MOVIES JUST FOR YOU!</p>
</div>

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
<div className="grid grid-cols-1 gap-10 w-full">
{filteredMovies.map((movie, index) => (
<div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-gray-100 text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer">
<img src={movie.poster_url} alt={movie.title} className="w-full md:w-56 h-80 object-cover" />
<div className="p-8 flex flex-col justify-center">
<h3 className="text-3xl font-black mb-1 text-gray-900">{movie.title}</h3>
<p className="text-indigo-600 font-bold text-sm mb-4 uppercase">{movie.year} • {movie.genre.join(", ")}</p>
<p className="text-gray-600 leading-relaxed italic">"{movie.description}"</p>
</div>
</div>
))}

{filteredMovies.length === 0 && (

<p className="text-2xl font-bold text-gray-400 mt-10">No movies found... 🎬</p>
)}
</div>

</div>
</div>
);
}

export default App;