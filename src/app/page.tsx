export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-background via-surface to-primary/5">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-6xl font-extrabold text-primary drop-shadow-lg">
          WatchWise
        </h1>
        <p className="text-xl text-gray-200">
          Discover smarter. Watch together.
        </p>
        <a
          href="#"
          className="inline-block px-8 py-3 bg-primary text-white rounded-full text-lg font-medium hover:bg-primary/80 transition transform hover:scale-105"
        >
          Find My Next Movie
        </a>
      </div>
    </main>
  );
}
