/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#D6FF3E",
        canvas: "#0A0A0A",
      },
      fontFamily: {
        display: ["Poppins", "Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(214,255,62,0.22)",
        glass: "0 25px 70px rgba(0,0,0,0.35)",
        panel: "0 30px 100px rgba(0,0,0,0.42)",
        edge: "inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(214,255,62,0.12), transparent 28%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08), transparent 25%)",
        "panel-gradient":
          "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
      },
    },
  },
  plugins: [],
};
