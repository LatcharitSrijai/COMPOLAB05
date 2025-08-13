import type { Config } from 'tailwindcss'

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: { sp: '0 3px 12px 0 rgba(0,0,0,0.2)' },
      fontFamily: { sans: ['Avenir','Helvetica','Arial','sans-serif'] },
      // สำหรับ hover:scale-101
      scale: { '101': '1.01' },

      keyframes: {
        yellowFade: {
          '0%':   { backgroundColor: '#fde047' },
          '100%': { backgroundColor: 'transparent' },
        },
      },
      animation: {
        fade: 'yellowFade 3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
