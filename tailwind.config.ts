import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#1C3A1C', light: '#234823', deep: '#142814' },
        grove:  { DEFAULT: '#2E6B2E', light: '#3C8A3C', dark: '#265426' },
        sage:   { DEFAULT: '#7EA86B', light: '#A0C490', muted: '#C4D9B8' },
        fern:   { DEFAULT: '#4D7C3A', light: '#6A9E55' },
        cream:  { DEFAULT: '#F5EFE0', warm: '#FAF6EC', pure: '#FDFBF5' },
        amber:  { DEFAULT: '#B97D2A', light: '#D4973E', pale: '#F0DDB0' },
        bark:   { DEFAULT: '#3D2E1A', light: '#6B5235' },
      },
      fontFamily: {
        display: ['Raleway', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card:  '0 2px 8px rgba(28,58,28,0.06), 0 8px 32px rgba(28,58,28,0.08)',
        hover: '0 4px 16px rgba(28,58,28,0.10), 0 16px 48px rgba(28,58,28,0.12)',
      },
    },
  },
  plugins: [],
}

export default config
