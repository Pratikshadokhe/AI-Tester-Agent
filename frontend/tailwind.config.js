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
        'border': '#1e1e2e',
        'muted': '#2a2a3d',
        'accent': '#6c63ff',
        'accent-dim': '#4f48cc',
        'accent-glow': 'rgba(108,99,255,0.15)',
        'neon': '#00f5a0',
        'neon-dim': 'rgba(0,245,160,0.12)',
        'warn': '#ff6b6b',
        'warn-dim': 'rgba(255,107,107,0.12)',
        'gold': '#ffd166',
        'text-primary': '#e8e8f0',
        'text-secondary': '#8888aa',
        'text-muted': '#4a4a6a',
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
