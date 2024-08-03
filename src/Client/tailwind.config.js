const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: "'Open Sans'",
      mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
    },
    extend: {
      keyframes: {
        flip: {
          "100%": { transform: "rotateY(360deg)" }
        },
        slideIn: {
          "100%": { right: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        flip: "flip 2s linear infinite",
        slideIn: "slideIn .5s ease-in forwards",
        fadeIn: "fadeIn .5s ease-in forwards",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      colors: {
        primary: "#2d3f4d",
        "primary-content": colors.white,
        secondary: "#3dae2b",
        "secondary-content": colors.white,
        info: colors.sky[500],
        "info-content": colors.white,
        success: colors.lime[500],
        "success-content": colors.white,
        warning: colors.orange[500],
        "warning-content": colors.white,
        danger: colors.red[500],
        "danger-content": colors.white,
        error: colors.red[500],
        "error-content": colors.white,
        base:{
          100: colors.white,
          200: colors.slate[100],
          300: colors.slate[400],
        },
        "base-content": "#334155",
      },
    },
  },
  plugins: [],
}

