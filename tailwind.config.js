/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'sa-gold': '#C9A961',
        'sa-green': '#006747',
        'sa-cream': '#E8E4DC',
        'sa-teal': '#A8C5C0',
        'sa-black': '#1A1A1A',
      },
    },
  },
  plugins: [],
}
