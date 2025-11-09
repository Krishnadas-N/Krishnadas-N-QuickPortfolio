/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hacker-green': '#00ff41',
        'hacker-cyan': '#00ffff',
        'hacker-purple': '#ff00ff',
        'hacker-red': '#ff0040',
        'terminal-bg': '#0a0a0a',
        'dark-bg': '#000000',
        'dark-card': 'rgba(0, 255, 65, 0.1)',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'display': ['Orbitron', 'sans-serif'],
        'hacker': ['JetBrains Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hacker-glow': 'linear-gradient(135deg, #00ff41 0%, #00ffff 50%, #ff00ff 100%)',
        'matrix': 'repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.03) 0px, transparent 1px, transparent 2px, rgba(0, 255, 65, 0.03) 3px)',
      },
      boxShadow: {
        'hacker-green': '0 0 20px rgba(0, 255, 65, 0.5), inset 0 0 20px rgba(0, 255, 65, 0.1)',
        'hacker-cyan': '0 0 20px rgba(0, 255, 255, 0.5)',
        'hacker-purple': '0 0 20px rgba(255, 0, 255, 0.5)',
        'glow': '0 0 30px rgba(0, 255, 65, 0.5)',
        'terminal': '0 0 10px rgba(0, 255, 65, 0.5), inset 0 0 10px rgba(0, 255, 65, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'glitch': 'glitch 2s infinite',
        'scan': 'scan 3s infinite',
        'typing': 'typing 1s infinite',
        'matrix': 'matrix 20s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { opacity: '0.5', transform: 'scale(1)', filter: 'brightness(1)' },
          '100%': { opacity: '1', transform: 'scale(1.05)', filter: 'brightness(1.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scan: {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        typing: {
          '0%, 50%': { borderColor: '#00ff41' },
          '51%, 100%': { borderColor: 'transparent' },
        },
        matrix: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
    },
  },
  plugins: [],
}

