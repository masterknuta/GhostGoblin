/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Your existing theme
        'deep-purple': '#1a0b2e',
        'dark-gray': '#16213e',
        'custom-black': '#0f0f0f',
        'neon-green': '#39ff14',
        'glowing-violet': '#8a2be2',
        'cyan': '#00ffff',

        // Gemini pastel & gradient colors
        'gemini-bg': '#f9fafb',
        'gemini-accent': '#6366f1', // Indigo 500
        'gemini-accent-light': '#a5b4fc', // Indigo 300
        'gemini-chat-bg': '#ffffff',
        'gemini-border': '#e5e7eb',
        'gemini-gradient-start': '#6366f1',
        'gemini-gradient-end': '#ec4899',
      },
      fontFamily: {
        // Your existing fonts
        'inter': ['Inter', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],

        // Gemini uses Inter heavily, so no new font needed
      },
      screens: {
        'xs': '475px', // your custom small breakpoint
      },
      animation: {
        // Your existing animations
        'shimmer': 'shimmer 2s ease-in-out infinite alternate',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'consciousness-flow': 'consciousness-flow 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',

        // Gemini smooth fade/slide animations
        'fade-in': 'fade-in 0.3s ease-in-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
      },
      keyframes: {
        // Your existing keyframes
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

        // Gemini animations
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
