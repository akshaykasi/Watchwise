import { fetchPopular, fetchTrending, fetchTopRated, fetchUpcoming } from "@/lib/tmdb";
import MovieSection from "@/components/MovieSection";
import type { Movie } from "@/lib/tmdb";

export const revalidate = 3600; // cache for 1 hour

export default async function MoviesPage() {
  // Parallel fetch of each category (first page only)
  const [popular, trending, topRated, upcoming] = await Promise.all([
    fetchPopular().then((res) => res.results),
    fetchTrending().then((res) => res.results),
    fetchTopRated().then((res) => res.results),
    fetchUpcoming().then((res) => res.results),
  ]);

  return (
    <main className="p-4 bg-background min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-primary text-center">Movie Discovery</h1>
      <MovieSection title="Popular Movies" moviesPromise={Promise.resolve(popular)} viewAllHref="/movies/popular" />
      <MovieSection title="Trending Movies" moviesPromise={Promise.resolve(trending)} viewAllHref="/movies/trending" />
      <MovieSection title="Top‑Rated Movies" moviesPromise={Promise.resolve(topRated)} viewAllHref="/movies/top-rated" />
      <MovieSection title="Upcoming Releases" moviesPromise={Promise.resolve(upcoming)} viewAllHref="/movies/upcoming" />
    </main>
  );
}
