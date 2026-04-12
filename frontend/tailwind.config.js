/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4285F4',
          50: '#EBF2FE',
          100: '#D6E5FD',
          200: '#ADCBFB',
          300: '#85B1F9',
          400: '#5C97F7',
          500: '#4285F4',
          600: '#1A6AF0',
          700: '#1257CC',
          800: '#0D44A8',
          900: '#083184',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          50: '#F5F0FE',
          100: '#EDE1FD',
          200: '#DAC3FB',
          300: '#C8A5F9',
          400: '#B687F7',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        dark: {
          DEFAULT: '#050714',
          50: '#0F1131',
          100: '#0A0C22',
          200: '#07091A',
          300: '#050714',
          card: '#0D1030',
          border: 'rgba(255,255,255,0.06)',
        }
      },
      fontFamily: {
        sans: ['"Google Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Google Sans Display"', '"Google Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4285F4, #8B5CF6, #06B6D4)',
        'gradient-blue-purple': 'linear-gradient(135deg, #4285F4, #8B5CF6)',
        'gradient-dark': 'linear-gradient(135deg, #050714, #0D1030)',
        'gradient-card': 'linear-gradient(135deg, rgba(66,133,244,0.08), rgba(139,92,246,0.05))',
        'gradient-hero': 'radial-gradient(ellipse at 50% 0%, rgba(66,133,244,0.25) 0%, rgba(5,7,20,0) 70%)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'pulse-slow': 'pulse 5s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'orb-drift-1': 'orbDrift1 20s ease-in-out infinite',
        'orb-drift-2': 'orbDrift2 25s ease-in-out infinite',
        'orb-drift-3': 'orbDrift3 18s ease-in-out infinite',
        'orb-drift-4': 'orbDrift4 30s ease-in-out infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'border-shimmer': 'borderShimmer 3s linear infinite',
        'scroll-marquee': 'scrollMarquee 25s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(2deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(66,133,244,0.3)' },
          '100%': { boxShadow: '0 0 50px rgba(66,133,244,0.6), 0 0 100px rgba(139,92,246,0.3)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        orbDrift1: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '25%': { transform: 'translate(5%, -8%) scale(1.1)' },
          '50%': { transform: 'translate(-3%, 5%) scale(0.95)' },
          '75%': { transform: 'translate(8%, 3%) scale(1.05)' },
        },
        orbDrift2: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '33%': { transform: 'translate(-6%, 10%) scale(1.15)' },
          '66%': { transform: 'translate(4%, -6%) scale(0.9)' },
        },
        orbDrift3: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '50%': { transform: 'translate(-4%, -8%) scale(1.08)' },
        },
        orbDrift4: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '40%': { transform: 'translate(3%, 6%) scale(0.92)' },
          '80%': { transform: 'translate(-5%, -3%) scale(1.06)' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        borderShimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        scrollMarquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      }
    },
  },
  plugins: [],
}
