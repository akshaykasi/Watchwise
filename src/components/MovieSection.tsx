import Link from "next/link";
import { type Movie, fetchGenres } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

interface MovieSectionProps {
  title: string;
  moviesPromise: Promise<Movie[]>;
  viewAllHref?: string;
}

export default async function MovieSection({ title, moviesPromise, viewAllHref }: MovieSectionProps) {
  const movies = await moviesPromise;
  const { genres } = await fetchGenres();

  const genreMap = new Map(genres.map((g) => [g.id, g.name]));

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-sm text-primary hover:underline">
            View all
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
