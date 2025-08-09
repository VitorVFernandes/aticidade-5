import { useState, useEffect } from "react";
import { searchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

export default function SearchPage({ favorites, setFavorites }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setTotalPages(1);
      return;
    }
    setLoading(true);
    setError("");
    searchMovies(query, page)
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch(() => setError("Erro ao buscar filmes"))
      .finally(() => setLoading(false));
  }, [query, page]);

  function handleFavorite(movie) {
    const exists = favorites.some(f => f.id === movie.id);
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  return (
    <main>
      <h1>Busca de Filmes</h1>
      <input
        type="text"
        placeholder="Digite o nome do filme"
        value={query}
        onChange={e => { setQuery(e.target.value); setPage(1); }}
      />
      {loading && <Loader />}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem', marginTop: '1rem' }}>
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onFavorite={handleFavorite}
            isFavorite={favorites.some(f => f.id === movie.id)}
          />
        ))}
      </div>
      {movies.length > 0 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </main>
  );
}
