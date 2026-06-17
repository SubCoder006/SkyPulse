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
        sky: {
          accent: '#38bdf8',
          light:  '#7dd3fc',
          soft:   '#bae6fd',
          dim:    '#0ea5e9',
        },
        dark: {
          950: '#020617',
          900: '#0a1020',
          800: '#0f172a',
          700: '#1e293b',
          600: '#293548',
          500: '#334155',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'glow':         'glow 2.5s ease-in-out infinite',
        'float':        'float 3.5s ease-in-out infinite',
        'fade-in':      'fadeIn 0.5s ease-out forwards',
        'slide-up':     'slideUp 0.4s ease-out forwards',
        'slide-down':   'slideDown 0.3s ease-out forwards',
        'pulse-glow':   'pulseGlow 2s ease-in-out infinite',
        'shimmer':      'shimmer 1.5s infinite',
        'cloud-drift':  'cloudDrift 5s ease-in-out infinite',
        'sun-spin':     'sunSpin 25s linear infinite',
        'rain-drop':    'rainDrop 0.9s linear infinite',
        'snow-fall':    'snowFall 4s linear infinite',
        'lightning':    'lightning 4s ease-in-out infinite',
        'fog-drift':    'fogDrift 8s ease-in-out infinite',
        'sway':         'sway 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%,100%': { textShadow: '0 0 8px #38bdf8, 0 0 16px #38bdf8' },
          '50%':     { textShadow: '0 0 18px #38bdf8, 0 0 36px #38bdf8, 0 0 54px #0ea5e9' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 12px rgba(56,189,248,0.25)' },
          '50%':     { boxShadow: '0 0 28px rgba(56,189,248,0.55)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        cloudDrift: {
          '0%,100%': { transform: 'translateX(-6px)' },
          '50%':     { transform: 'translateX(6px)' },
        },
        sunSpin: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        rainDrop: {
          '0%':   { transform: 'translateY(-20px)', opacity: '0' },
          '15%':  { opacity: '1' },
          '85%':  { opacity: '1' },
          '100%': { transform: 'translateY(80px)',  opacity: '0' },
        },
        snowFall: {
          '0%':   { transform: 'translateY(-20px) rotate(0deg)',   opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(90px) rotate(360deg)', opacity: '0' },
        },
        lightning: {
          '0%,88%,100%': { opacity: '0' },
          '90%,95%':     { opacity: '1' },
        },
        fogDrift: {
          '0%,100%': { transform: 'translateX(-8px)', opacity: '0.5' },
          '50%':     { transform: 'translateX(8px)',  opacity: '0.9' },
        },
        sway: {
          '0%,100%': { transform: 'rotate(-5deg)' },
          '50%':     { transform: 'rotate(5deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;