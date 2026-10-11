// src/lib/tmdb.ts
/**
 * Helper functions for communicating with The Movie Database (TMDB) API.
 * All calls are performed server‑side – the API key is never exposed to the browser.
 */

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

/** Retrieve the TMDB API key from environment variables. */
function getApiKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    throw new Error("TMDB_API_KEY is not set in environment variables");
  }
  return key;
}

/** Generic fetch wrapper that appends the API key and handles errors. */
async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", getApiKey());
  // Append additional query parameters
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText} – ${errText}`);
  }
  return (await res.json()) as T;
}

/** Types representing TMDB responses (partial for our needs) */
export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  name?: string; // some TV endpoints use name
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string; // movies
  first_air_date?: string; // tv
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/** Image helper – returns full URL or placeholder */
export function getPosterUrl(path: string | null, size: "w300" | "w500" = "w300"): string {
  return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : "/placeholder-poster.png"; // placeholder should exist in public
}

/** Fetch popular movies */
/** Fetch popular movies */
export const fetchPopular = async (page = 1) => {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    console.warn('TMDB_API_KEY is not set; returning empty popular movies');
    return { page, results: [], total_pages: 0, total_results: 0 } as PaginatedResponse<Movie>;
  }
  return tmdbFetch<PaginatedResponse<Movie>>('/movie/popular', { page: page.toString() });
};
/** Fetch trending movies (day) */
export const fetchTrending = async (page = 1) => {
  if (!process.env.TMDB_API_KEY) {
    console.warn('TMDB_API_KEY is not set; returning empty trending movies');
    return { page, results: [], total_pages: 0, total_results: 0 } as PaginatedResponse<Movie>;
  }
  return tmdbFetch<PaginatedResponse<Movie>>('/trending/movie/day', { page: page.toString() });
};
/** Fetch top‑rated movies */
export const fetchTopRated = async (page = 1) => {
  if (!process.env.TMDB_API_KEY) {
    console.warn('TMDB_API_KEY is not set; returning empty top‑rated movies');
    return { page, results: [], total_pages: 0, total_results: 0 } as PaginatedResponse<Movie>;
  }
  return tmdbFetch<PaginatedResponse<Movie>>('/movie/top_rated', { page: page.toString() });
};
/** Fetch upcoming movies */
export const fetchUpcoming = async (page = 1) => {
  if (!process.env.TMDB_API_KEY) {
    console.warn('TMDB_API_KEY is not set; returning empty upcoming movies');
    return { page, results: [], total_pages: 0, total_results: 0 } as PaginatedResponse<Movie>;
  }
  return tmdbFetch<PaginatedResponse<Movie>>('/movie/upcoming', { page: page.toString() });
};
/** Search movies by query */
export const searchMovies = async (query: string, page = 1) => {
  if (!process.env.TMDB_API_KEY) {
    console.warn('TMDB_API_KEY is not set; returning empty search results');
    return { page, results: [], total_pages: 0, total_results: 0 } as PaginatedResponse<Movie>;
  }
  return tmdbFetch<PaginatedResponse<Movie>>('/search/movie', { query, page: page.toString() });
};
/** Fetch list of genres */
export const fetchGenres = async () => {
  if (!process.env.TMDB_API_KEY) {
    console.warn('TMDB_API_KEY is not set; returning empty genres');
    return { genres: [] } as { genres: Genre[] };
  }
  return tmdbFetch<{ genres: Genre[] }>('/genre/movie/list');
};
/** Fetch movie details */
export const fetchMovieDetails = async (id: string | number) => {
  if (!process.env.TMDB_API_KEY) {
    console.warn('TMDB_API_KEY is not set; returning empty details');
    return {} as Movie;
  }
  return tmdbFetch<Movie>(`/movie/${id}`);
};

/** Export image base for potential use in client components */
export const IMAGE_BASE = TMDB_IMAGE_BASE;
