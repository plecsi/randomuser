/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {},
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
      },
    },
    fontSize: {
      h1: [
        "2rem",
        {
          fontWeight: "500",
        },
      ],
      h2: ["1.6rem", "1.1em"],
      h3: ["1.2rem", "1.1em"],
      h4: ["1.2rem", "1.1em"],
    },
  },
};
