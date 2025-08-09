import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchPage from "./SearchPage";
import DetailsPage from "./pages/DetailsPage";
import FavoritesPage from "./FavoritesPage";

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Router>
      <header style={{ padding: '1rem', backgroundColor: '#222', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        <h1>TMDB React</h1>
        <nav>
          <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Busca</Link>
          <Link to="/favoritos" style={{ color: 'white' }}>Favoritos ({favorites.length})</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<SearchPage favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/detalhes/:id" element={<DetailsPage favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/favoritos" element={<FavoritesPage favorites={favorites} setFavorites={setFavorites} />} />
      </Routes>
    </Router>
  );
}
