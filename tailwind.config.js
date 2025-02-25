// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"], 
        heading: ["'Montserrat'", "sans-serif"], 
      },
    },
  },
  plugins: [],
};
