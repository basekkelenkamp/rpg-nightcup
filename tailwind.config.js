// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // For Next.js 13, include these paths
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',    // Include the app directory for the App Router
  ],
  theme: {
    extend: {
      fontFamily: {
        explosive: ['"Russo One"', 'sans-serif'],
      },
      spacing: {
        '36': '9rem',  // For w-36
        '42': '10.5rem',  // For w-42
        '32': '8rem',  // For w-32
      },
      boxShadow: {
        '3xl': '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [
    require('daisyui'),                      // Include DaisyUI plugin
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
  daisyui: {
    themes: [
      {
        mycustomtheme: {
          "primary": "#d73435",            // rgb(215,52,53) - Accent Color
          "secondary": "#083c3f",          // rgb(8,60,63) - Slight dark variation
          "accent": "#d73435",             // Same as primary for accent
          "neutral": "#043442",            // rgb(4,52,66) - Background Color
          "base-100": "#043442",           // Background Color
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
          "text-base": "#ffffff",          // Light text color for contrast
        },
      },
    ],
  },
};
