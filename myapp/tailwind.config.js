/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        martel: ['Martel', 'sans-serif'],
      },
      dropShadow: {
        green: '0 4px 6px 4px #C6F7D3',
        blue: '0 4px 6px 4px #0A8F9A',
      },
      colors: {
        chatBg: 'hsl(217deg 33% 18% / 0.5)',
        inputBg: 'hsl(222.2deg 83.15% 3.95%)',
        sendBtn: 'hsl(222.2deg 83.15% 3.95%)',
        pageBg: 'hsl(222.2deg 83.15% 3.95%)',
      },
    },
  },
  plugins: [],
}
