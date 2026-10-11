import Image from "next/image";
import Link from "next/link";
import { getPosterUrl, type Movie } from "@/lib/tmdb";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const title = movie.title ?? movie.name ?? "Untitled";
  const year = movie.release_date?.split("-")[0] ?? movie.first_air_date?.split("-")[0] ?? "";
  const posterUrl = getPosterUrl(movie.poster_path, "w300");

  return (
    <Link href={`/movies/${movie.id}`} className="group block transform transition hover:scale-105">
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg bg-gray-800">
        {/* Image with placeholder fallback */}
        <Image
          src={posterUrl}
          alt={title}
          fill
          className="object-cover group-hover:opacity-90 transition-opacity"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-white">
          <h3 className="text-sm font-bold line-clamp-2">{title}</h3>
          {year && <span className="text-xs opacity-80">{year}</span>}
        </div>
      </div>
    </Link>
  );
}
