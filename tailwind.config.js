/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF6E8',
          soft: '#FFFCF7',
          50: '#FFFCF7',
          100: '#FFF6E8',
          200: '#FDEECC',
          300: '#FADFA3',
        },
        butter: {
          DEFAULT: '#F6D98B',
          light: '#FDF0C8',
          hover: '#E8C76D',
          dark: '#D4AC41',
        },
        caramel: {
          DEFAULT: '#C98752',
          light: '#E0A87A',
          dark: '#A76635',
        },
        bread: {
          DEFAULT: '#75452D',
          light: '#965C3D',
          dark: '#54301E',
        },
        espresso: {
          DEFAULT: '#2D1B15',
          soft: '#3D261E',
          card: '#1F120E',
          deep: '#150B08',
        },
        sage: {
          DEFAULT: '#A8B49A',
          light: '#C4CDC9',
          dark: '#7A886B',
        }
      },
      fontFamily: {
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(45, 27, 21, 0.12)',
        'glass-dark': '0 8px 32px 0 rgba(15, 8, 6, 0.35)',
        'warm': '0 12px 30px -10px rgba(117, 69, 45, 0.15)',
        'warm-lg': '0 20px 40px -15px rgba(45, 27, 21, 0.22)',
        'glow-butter': '0 0 25px rgba(246, 217, 139, 0.45)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
