/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Syne"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
        'body': ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        'void': '#050508',
        'surface': '#0d0d14',
        'panel': '#12121c',
        'border': '#252538',
        'muted': '#2a2a3d',
        'accent': '#7c6fff',
        'accent-dim': '#5b52dd',
        'accent-glow': 'rgba(124,111,255,0.18)',
        'neon': '#0af5a8',
        'neon-dim': 'rgba(10,245,168,0.14)',
        'warn': '#ff5757',
        'warn-dim': 'rgba(255,87,87,0.14)',
        'gold': '#ffcd3c',
        'sky': '#38d9f5',
        'pink': '#f562ff',
        'text-primary': '#ffffff',
        'text-secondary': '#c8c8e8',
        'text-muted': '#7070a0',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(108,99,255,0.25)',
        'glow-neon': '0 0 20px rgba(0,245,160,0.2)',
        'panel': '0 4px 24px rgba(0,0,0,0.4)',
        'card': '0 2px 12px rgba(0,0,0,0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'progress': 'progress 1.5s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        progress: {
          '0%': { width: '0%' },
          '50%': { width: '70%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}
