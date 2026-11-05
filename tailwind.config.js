/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        solar: {
          background: '#F8F9FF',
          surface: '#FFFFFF',
          pale: '#EFF4FF',
          line: '#DCE9FF',
          navy: '#0B1C30',
          blue: '#00458C',
          orange: '#F18800',
          muted: '#64748B',
          green: '#16A34A',
          red: '#BA1A1A',
        },
      },
    },
  },
  plugins: [],
};
