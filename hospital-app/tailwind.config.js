/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#0066cc', dark: '#0055aa', light: '#e8f0fe' },
        navy: { DEFAULT: '#0a1628', mid: '#0a2a4a' },
        accent: '#4fc3f7',
        danger: '#e63946',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
