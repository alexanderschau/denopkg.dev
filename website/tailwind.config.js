// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#161E2E",
        secondary: "#F0F1F5",
        "primary-dark": "#DDE3EE",
        "secondary-dark": "#0A0E15",
      },
      opacity: {
        2: "0.02",
      },
    },
  },
  darkMode: "media",
};
