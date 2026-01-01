import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'text-primary': 'rgba(0, 0, 0, 0.85)',
        'text-secondary': 'rgba(0, 0, 0, 0.75)',
        'border': 'rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        heading: ['var(--font-diatype)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': '3.8rem',
        'h1-mobile': '3.4rem',
        'h2': '2.5rem',
        'body': '1.5rem',
        'caption': '1.5rem',
      },
      spacing: {
        'gutter': '1rem',
      },
      borderRadius: {
        'full': '999rem',
      },
    },
  },
  plugins: [],
};

export default config;
