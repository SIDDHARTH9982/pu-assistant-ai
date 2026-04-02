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
          DEFAULT: '#6C63FF',
          50: '#F0EFFF',
          100: '#E1DFFF',
          200: '#C4BFFF',
          300: '#A69EFF',
          400: '#897EFF',
          500: '#6C63FF',
          600: '#4F44E0',
          700: '#3A31B8',
          800: '#271F8F',
          900: '#150F66',
        },
        accent: {
          DEFAULT: '#00D4FF',
          50: '#E0F9FF',
          100: '#B3F0FF',
          200: '#80E8FF',
          300: '#4DDEFF',
          400: '#1AD5FF',
          500: '#00D4FF',
          600: '#00AAD4',
          700: '#0080A8',
          800: '#00567C',
          900: '#002C50',
        },
        dark: {
          DEFAULT: '#0A0B1E',
          50: '#1A1B35',
          100: '#14152B',
          200: '#0F1022',
          300: '#0A0B1E',
          card: '#12132D',
          border: 'rgba(255,255,255,0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6C63FF, #00D4FF)',
        'gradient-dark': 'linear-gradient(135deg, #0A0B1E, #12132D)',
        'gradient-card': 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,255,0.05))',
        'gradient-hero': 'radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.3) 0%, rgba(10,11,30,0) 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(108,99,255,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(108,99,255,0.6), 0 0 80px rgba(0,212,255,0.2)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
