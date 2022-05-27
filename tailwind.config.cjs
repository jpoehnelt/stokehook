module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          lg: "4rem",
          xl: "12rem",
          "2xl": "16rem",
        },
      },
      lineHeight: {
        'extra-loose': '2.5',
        '12': '3rem',
      }
    },
  },
  plugins: [],
};
