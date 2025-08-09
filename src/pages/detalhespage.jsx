import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import Loader from "../components/Loader";

export default function DetailsPage({ favorites, setFavorites }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMovieDetails(id)
      .then(setMovie)
      .catch(() => setError("Erro ao carregar detalhes"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p style={{color: 'red'}}>{error}</p>;
  if (!movie) return null;

  const director = movie.credits.crew.find(c => c.job === "Director")?.name || "N/A";
  const cast = movie.credits.cast.slice(0, 6).map(a => a.name).join(", ");
  const isFav = favorites.some(f => f.id === movie.id);

  function handleFavorite() {
    if (isFav) {
      setFavorites(favorites.filter(f => f.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  return (
    <article>
      <button onClick={() => navigate(-1)} style={{marginBottom: '1rem'}}>← Voltar</button>
      <h1>{movie.title} ({movie.release_date?.slice(0,4)})</h1>
      {movie.poster_path && <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />}
      <p><strong>Diretor:</strong> {director}</p>
      <p><strong>Elenco:</strong> {cast}</p>
      <p><strong>Sinopse:</strong> {movie.overview}</p>
      <p><strong>Avaliação:</strong> {movie.vote_average}</p>
      <button onClick={handleFavorite}>
        {isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      </button>
    </article>
  );
}
