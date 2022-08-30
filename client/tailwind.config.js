/** @type {import('tailwindcss').Config} */

const extendedColors = {
  primary: '#563838',
  secondary: '#A37C27',
  tertiary: '#6A8A82',
  danger: '#FF0000'
};

const spacingValues = {
  200: '200px',
  250: '250px',
  300: '300px',
  320: '320px',
  350: '350px',
  400: '400px',
  500: '500px',
  600: '600px',
  700: '700px',
  800: '800px',
  900: '900px',
  1000: '1000px',
  1100: '1100px'
};

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...extendedColors
      },
      minWidth: {
        ...spacingValues
      },
      maxWidth: {
        ...spacingValues
      },
      minHeight: {
        ...spacingValues
      },
      maxHeight: {
        ...spacingValues
      },
      spacing: {
        ...spacingValues
      },
      animation: {
        'alert-slide-in-right': 'alertSlideInRight 0.4s ease-in-out',
        'alert-slide-out-right': 'alertSlideOutRight 0.4s ease-in-out forwards'
      },
      keyframes: {
        alertSlideInRight: {
          '0%': { marginLeft: '130%' },
          '100%': { marginLeft: '0' }
        },
        alertSlideOutRight: {
          '0%': { marginLeft: '0%' },
          '100%': { marginLeft: '130%' }
        }
      }
    }
  },
  plugins: []
};
