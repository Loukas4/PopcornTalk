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