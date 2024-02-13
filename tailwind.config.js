/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "var(--black-aa-100)",
          200: "var(--black-aa-200)",
          300: "var(--black-aa-300)",
          400: "var(--black-aa-400)",
          500: "var(--black-aa-500)",
          600: "var(--black-aa-600)",
          700: "var(--black-aa-700)",
          800: "var(--black-aa-800)",
          900: "var(--black-aa-900)",
          1000: "var(--black-aa-1000)",
          1100: "var(--black-aa-000)"
        },
        secondary: {
          100: "var(--blue-neon-100)",
          200: "var(--blue-neon-200)",
          300: "var(--blue-neon-300)",
          400: "var(--blue-neon-400)",
          500: "var(--blue-neon-500)",
          600: "var(--blue-neon-600)",
          700: "var(--blue-neon-700)",
          800: "var(--blue-neon-800)",
          900: "var(--blue-neon-900)",
          1000: "var(--blue-neon-1000)",
          1100: "var(--blue-neon-1100)",
        }
      },
    }
  },
  plugins: [],
}

