/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Çini (İznik tile) esinli palet
        cini: {
          cobalt: "#163A5F", // koyu lacivert - zemin/başlık
          turkuaz: "#0E9AA7", // çini turkuazı - vurgu
          kiremit: "#C1440E", // kiremit kırmızısı - aksiyon/vurgu
          krem: "#F6EEDD", // krem - zemin
          altin: "#C9A24B", // altın - detay/çizgi
          lacivert2: "#0F2A47",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "tile-pattern":
          "radial-gradient(circle at 1px 1px, rgba(201,162,75,0.15) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
