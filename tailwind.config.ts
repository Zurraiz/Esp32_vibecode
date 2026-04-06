import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-orange-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-yellow-400',
    'bg-green-500',
    'bg-red-500',
    'bg-emerald-500',
    'bg-blue-500',
    'bg-sky-500',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        primary: '#2E4862',
      },
    },
  },
  plugins: [],
}

export default config