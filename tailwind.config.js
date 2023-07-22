/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        "saira-stencil-one": "var(--font-saira-stencil-one)",
        "inter": "var(--font-inter)",
        "changa-one": "var(--font-changa-one)",
        "instrument-sans": "var(--font-instrument-sans)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'rapperBG': "url('../public/images/rap-bg.png')",
        'logo': "url('../public/images/logo.png')",
        'trending': "url('../public/trending.svg')",
      },
    },
  },
  plugins: [],
}
