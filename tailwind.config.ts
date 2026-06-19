import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kleuren afgeleid van de affiche
        'hl-green': '#6f9d6a',
        'hl-green-dark': '#4f7f63',
        'hl-green-light': '#8fb073',
        'hl-sage': '#a7c48d',
        'hl-mint': '#d2e8c4',
        'hl-pale': '#eef5e6',
        'hl-orange': '#e8662a',
        'hl-orange-dark': '#cf551e',
        'hl-navy': '#1f3a5f',
        'hl-cream': '#faf8f1',
        'hl-brown': '#8a6d4f',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'sans-serif'],
        marker: ['var(--font-marker)', 'cursive'],
        heading: ['var(--font-fredoka)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
