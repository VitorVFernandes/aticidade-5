import MovieCard from "../components/MovieCard";

export default function FavoritesPage({ favorites, setFavorites }) {
  function handleRemove(movie) {
    setFavorites(favorites.filter(f => f.id !== movie.id));
  }

  return (
    <main>
      <h1>Filmes Favoritos</h1>
      {favorites.length === 0 ? (
        <p>Você ainda não tem filmes favoritos.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' }}>
          {favorites.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavorite={handleRemove}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </main>
  );
}
