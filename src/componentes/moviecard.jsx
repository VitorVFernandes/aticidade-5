import { Link } from "react-router-dom";

export default function MovieCard({ movie, onFavorite, isFavorite }) {
  return (
    <div className="movie-card">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <div style={{width: 200, height: 300, backgroundColor: '#ccc'}}>Sem pôster</div>
      )}
      <h3>{movie.title}</h3>
      <p>{movie.release_date?.slice(0, 4)}</p>
      <div>
        <Link to={`/detalhes/${movie.id}`}>Ver detalhes</Link>
        <button onClick={() => onFavorite(movie)}>
          {isFavorite ? "Remover" : "Favoritar"}
        </button>
      </div>
    </div>
  );
}
