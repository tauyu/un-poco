/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Andalucía warm sunshine & terracotta tiles
        andalucia: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Albero gold
          600: '#d97706',
          700: '#b45309',
          terracotta: '#c2410c', // Sevilla clay
          rust: '#9a3412',
        },
        // Casa Batlló Mediterranean ocean azure & trencadís glass
        batllo: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Turquoise sea
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          navy: '#0f172a',
          azure: '#0284c7', // Gaudi dragon spine blue
          ocean: '#0369a1',
        },
        sand: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          800: '#292524',
          900: '#1c1917',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'serif'
        ]
      },
    },
  },
  plugins: [],
}
