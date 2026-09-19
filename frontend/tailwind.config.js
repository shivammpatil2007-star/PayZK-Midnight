/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#090d16',
        },
        prover: '#10b981', // Emerald Green
        verifier: '#06b6d4', // Cyber Cyan
        issuer: '#f59e0b', // Amber
        midnight: '#6366f1', // Midnight Indigo
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      }
    },
  },
  plugins: [],
}
