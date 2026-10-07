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
        aqua: '#00BFFF',
        charcoal: '#1F1F1F',
        grey: '#A9A9A9',
        gold: '#FFD700',
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
        muted: '#A9A9A9',
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
