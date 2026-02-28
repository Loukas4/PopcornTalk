function MovieCard({movie}) {
    return(
        <div className="movie-card">
            <a href={movie .url} rel="noopener noreferrer">
                <div className="poster">
                    <div className="rating"><i className="star"></i>{movie.rating}</div>
                    <img src={movie.imgUrl} alt={`${movie.title} Poster`} />
                </div>
                <div className="info">
                    <h2>{movie.title}</h2>
                    <p>{movie.description}</p>
                    <span className="release-date">{movie.release_date}</span>
                </div>
            </a>
        </div>
    );
}

export default MovieCard;