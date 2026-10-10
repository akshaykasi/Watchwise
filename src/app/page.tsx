export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-primary mb-4">WatchWise</h1>
      <p className="text-lg text-white mb-6">
        Discover smarter. Watch together.
      </p>
      <a
        href="#"
        className="px-6 py-3 bg-primary text-white rounded hover:bg-primary/80 transition"
      >
        Find My Next Movie
      </a>
    </main>
  );
}
