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
        brand: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
          900: '#1e1b4b',
        },
        emerald: {
          500: '#10b981',
          600: '#059669',
        },
        amber: {
          500: '#f59e0b',
          600: '#d97706',
        },
        rose: {
          500: '#f43f5e',
          600: '#e11d48',
        },
        sky: {
          500: '#0ea5e9',
          600: '#0284c7',
        },
        purple: {
          500: '#a855f7',
          600: '#9333ea',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
