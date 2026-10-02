import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        aqua: {
          50: '#eafaff',
          100: '#cff3ff',
          200: '#a2eaff',
          300: '#66dcff',
          400: '#20c9f4',
          500: '#00a8d6',
          600: '#007fa3',
          700: '#006580',
          800: '#07536a',
          900: '#0b4558',
          950: '#062d3b',
          DEFAULT: '#00BFFF',
        },
        charcoal: {
          50: '#f7f7f7',
          100: '#eeeeee',
          200: '#d6d6d6',
          300: '#b0b0b0',
          400: '#888888',
          500: '#666666',
          600: '#4b4b4b',
          700: '#333333',
          800: '#262626',
          900: '#1F1F1F',
          950: '#141414',
          DEFAULT: '#1F1F1F',
        },
        grey: '#A9A9A9',
        gold: {
          50: '#fffbea',
          100: '#fff3c4',
          200: '#ffe588',
          300: '#ffd84d',
          400: '#f5c400',
          500: '#d9a900',
          600: '#a87900',
          700: '#805900',
          800: '#694700',
          900: '#583b00',
          950: '#321f00',
          DEFAULT: '#FFD700',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundColor: {
        brand: '#00BFFF',
        ink: '#1F1F1F',
        soft: '#A9A9A9',
        accent: '#FFD700',
      },
      textColor: {
        ink: '#1F1F1F',
        muted: '#4b4b4b',
        highlight: '#00BFFF',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(31, 31, 31, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
