/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1976d2',
        secondary: '#dc004e',
        success: '#4caf50',
        text: {
          primary: '#000000',
          secondary: '#757575',
          hint: '#9e9e9e'
        },
        background: '#ffffff'
      }
    },
  },
  plugins: [],
};
