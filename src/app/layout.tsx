import './globals.css';

export const metadata = {
  title: 'WatchWise',
  description: 'Discover smarter. Watch together.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="text-white">
      <body className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-surface">
        {children}
      </body>

    </html>
  );
}
