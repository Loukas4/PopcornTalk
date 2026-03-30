import { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]); 
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // 1. Η κύρια συνάρτηση για φόρτωμα ταινιών (Popular ή Search)
    const fetchMovies = async (isNewSearch = false) => {
        setLoading(true);
        try {
            const currentPage = isNewSearch ? 1 : page;
            
            // Επιλογή URL: Αν υπάρχει κείμενο ψάχνει, αν όχι φέρνει τα δημοφιλή
            const endpoint = searchTerm 
                ? `http://localhost:3000/api/movies/search` 
                : `http://localhost:3000/api/movies/popular`;

            const response = await axios.get(endpoint, {
                params: { 
                    query: searchTerm, 
                    page: currentPage 
                }
            });

            const newMovies = response.data;

            if (isNewSearch) {
                setMovies(newMovies);
                setPage(2);
            } else {
                setMovies(prev => [...prev, ...newMovies]);
                setPage(prev => prev + 1);
            }
        } catch (err) {
            console.error("Σφάλμα σύνδεσης με το Backend στη θύρα 3000:", err);
        } finally {
            setLoading(false);
        }
    };

    // 2. useEffect: Φορτώνει αυτόματα τις Popular ταινίες μόλις ανοίξει η σελίδα
    useEffect(() => {
        fetchMovies(true);
    }, []);

    return (
       <div>
        <Outlet/>
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
                onKeyDown={(e) => e.key === 'Enter' && fetchMovies(true)}
            />
            <button 
                onClick={() => fetchMovies(true)}
                className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
                {loading && searchTerm ? "..." : "SEARCH"}
            </button>
        </div> 

        {/* Sign In Button */}
        <div> 
            <Link to="/auth"> 
                <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors absolute top-12 right-0 top-36">
                    Sign In
                </button>
            </Link>
        </div>

        {/* RESPONSIVE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {movies.map((movie, index) => (
                <div key={`${movie.id}-${index}`} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col border border-gray-100 text-left transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl cursor-pointer">
                    
                    {/* TMDB Image path logic */}
                    <img 
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no-image.png'} 
                        alt={movie.title} 
                        className="w-full h-80 object-cover" 
                    />

                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-black mb-1 text-gray-900 leading-tight">{movie.title}</h3>
                        <p className="text-indigo-600 font-bold text-xs mb-3 uppercase">
                            {movie.release_date?.split('-')[0] || "N/A"} • ⭐ {movie.vote_average}
                        </p>
                        <p className="text-gray-600 text-sm italic line-clamp-3">
                            {movie.overview ? `"${movie.overview}"` : "No description available."}
                        </p>
                    </div>
                </div>
            ))}
        </div>

        {/* LOAD MORE BUTTON */}
        {movies.length > 0 && (
            <button 
                onClick={() => fetchMovies(false)}
                className="mt-12 bg-indigo-600 text-white px-10 py-4 rounded-full font-black hover:bg-indigo-700 transition-all shadow-xl disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "LOADING..." : "LOAD MORE MOVIES"}
            </button>
        )}

        {movies.length === 0 && !loading && (
            <p className="text-2xl font-bold text-gray-400 mt-10">No movies found... 🎬</p>
        )}

        </div>
        </div>
      </div>
    );
}

export default Home;