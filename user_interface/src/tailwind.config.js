/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#1a0b2e',
        'dark-gray': '#16213e',
        'black': '#0f0f0f',
        'neon-green': '#39ff14',
        'glowing-violet': '#8a2be2',
        'cyan': '#00ffff',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite alternate',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'consciousness-flow': 'consciousness-flow 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { opacity: '0.8', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px #39ff14' },
          '50%': { boxShadow: '0 0 20px #39ff14, 0 0 30px #39ff14' },
        },
        'consciousness-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}