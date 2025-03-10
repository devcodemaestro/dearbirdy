module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        background: "#F9F8F3",
        white1: "#FFFFFF",
        white2: "#F9F8F3",
      },
      fontFamily: {
        nanumBrush: ["var(--font-nanumBrush)", "cursive"],
      },
      keyframes: {
        "slide-up": {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "slide-up": "slideUp 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
