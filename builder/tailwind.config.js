module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        loading: {
          '0%': { left: '-100%' },
          '50%': { left: '100%' },
          '100%': { left: '-100%' },
        },
      },
      animation: {
        loading: 'loading 3s linear infinite',
      },
    },
  },
  plugins: [],
};
