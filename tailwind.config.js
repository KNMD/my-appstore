/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        'shiny': 'shiny-btn-anim 5s ease-in-out infinite',
        'waving': 'wave 2s linear infinite',
      },
      keyframes: {
        'shiny-btn-anim': {
          '0%': { transform: 'scale(0) rotate(45deg)', opacity: 0 },
          '80%': { transform: 'scale(0) rotate(45deg)', opacity: 0.5 },
          '81%': { transform: 'scale(4) rotate(45deg)', opacity: 1 },
          '100%': { transform: 'scale(50) rotate(45deg)', opacity: 0 }
        },
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      }
    },
  },
  plugins: [
    nextui()
  ],
};

