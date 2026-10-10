module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c3aed', // electric violet
        secondary: '#06b6d4', // cyan
        background: '#111827', // near-black
        surface: '#1e293b', // midnight navy
      },
    },
  },
  plugins: [],
};
