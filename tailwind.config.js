/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cute': ['Quicksand', 'sans-serif'],
        'fancy': ['Pacifico', 'cursive'],
      },
      colors: {
        'valentine': {
          'pink': '#FF6B9D',
          'rose': '#FF4081',
          'blush': '#FFC1CC',
          'deep': '#C94277',
          'cream': '#FFF5F7',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'pulse-heart': 'pulse-heart 1s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'pulse-heart': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      }
    },
  },
  plugins: [],
}
