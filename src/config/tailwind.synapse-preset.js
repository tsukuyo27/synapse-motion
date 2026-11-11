/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        synapse: {
          blue: '#89cff0',
          pink: '#ffb6c1',
          surface: '#f8fafc',
          text: '#2c3e50',
          dark: '#0f172a',
          emerald: '#10b981',
          danger: '#ef4444'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.2s cubic-bezier(0, 0, 0.2, 1) forwards',
        'fade-out': 'fadeOut 0.18s cubic-bezier(0.4, 0, 1, 1) forwards',
        'fade-in-up': 'fadeInUp 0.25s cubic-bezier(0, 0, 0.2, 1) forwards',
        'fade-in-down': 'fadeInDown 0.25s cubic-bezier(0, 0, 0.2, 1) forwards',
        'zoom-in': 'zoomIn 0.2s cubic-bezier(0, 0, 0.2, 1) forwards',
        'zoom-out': 'zoomOut 0.18s cubic-bezier(0.4, 0, 1, 1) forwards',
        'pop-in': 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'soft-rise': 'softRise 0.18s ease-out forwards',
        'shake': 'shake 0.38s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        'blob': 'blob 7s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        zoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        zoomOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' }
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        softRise: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        shake: {
          '10%, 90%': { transform: 'translateX(-1px)' },
          '20%, 80%': { transform: 'translateX(2px)' },
          '30%, 50%, 70%': { transform: 'translateX(-4px)' },
          '40%, 60%': { transform: 'translateX(4px)' }
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(25px, -35px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.94)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' }
        }
      }
    }
  }
};

