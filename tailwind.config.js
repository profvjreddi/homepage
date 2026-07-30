/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Harvard crimson, previously hardcoded as #A51C30 throughout the site
        crimson: {
          DEFAULT: '#A51C30',
          dark: '#8B1A2B',
        },
        // ETH Zurich corporate design blue, used only for sabbatical-related surfaces
        eth: {
          DEFAULT: '#215CAF',
          dark: '#1A4A8F',
          50: '#EDF3FA',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

