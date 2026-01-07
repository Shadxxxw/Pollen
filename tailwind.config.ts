import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        honey: {
          50: '#fff8e6',
          100: '#ffefc2',
          200: '#ffe08a',
          300: '#ffd054',
          400: '#ffc12f',
          500: '#f4aa0a',
          600: '#d98904',
          700: '#b26506',
          800: '#91500d',
          900: '#784112'
        },
        pollen: {
          cream: '#fbf8f0',
          sand: '#f5efdc'
        }
      },
      boxShadow: {
        soft: '0 18px 45px rgba(23, 23, 23, 0.12)'
      }
    }
  },
  plugins: []
};

export default config;
