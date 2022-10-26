module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'templateCustom': 'repeat(auto-fill, minmax(330px, 1fr))'
      },
      keyframes: {
        loading: {
          '0%': { left: '-100%' },
          '50%': { left: '100%' },
          '100%': { left: '-100%' },
        },
      },
      animation: {
        loading: 'loading 2s linear infinite',
      },
    },
  },
  plugins: [],
};
