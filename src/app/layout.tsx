import './globals.css';

export const metadata = {
  title: 'WatchWise',
  description: 'Discover smarter. Watch together.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-neutral-900 text-white">
      <body className="min-h-screen flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
