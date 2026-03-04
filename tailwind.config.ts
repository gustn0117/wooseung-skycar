import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        accent: '#F5C542',
      },
      fontFamily: {
        noto: ['var(--font-noto-sans-kr)'],
        figtree: ['var(--font-figtree)'],
      },
    },
  },
  plugins: [],
}
export default config
