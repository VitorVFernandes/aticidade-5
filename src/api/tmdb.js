const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function searchMovies(query, page = 1) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}&page=${page}`);
  if (!res.ok) throw new Error("Erro ao buscar filmes");
  return res.json();
}

export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`);
  if (!res.ok) throw new Error("Erro ao buscar detalhes");
  return res.json();
}
