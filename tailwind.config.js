/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        league: ['League Spartan', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        'blue-primary': '#0080F5',
        'blue-secondary': '#090CE8',
        'blue-tertiary': '#1011A6',
        yellow: '#D1DC35',
        'yellow-secondary': '#a0a823',
        'grey-primary': '#999999',
        'grey-secondary': '#656565',
        'white-primary': '#cccccc'
      },
      backgroundImage: {
        campo: "url('../assets/imagem-campo.png')",
        quadra: "url('../assets/maua3.1.png')"
      }
    }
  },
  plugins: []
}
