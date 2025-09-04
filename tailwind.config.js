import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom glassmorphism utilities
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        // Custom color scheme for Pothole Indi
        primary: '#FFFFFF',
        'primary-content': '#000000',
        secondary: '#F3F4F6',
        accent: '#374151',
        neutral: '#1F2937',
        'base-100': '#FFFFFF',
        'base-200': '#F9FAFB',
        'base-300': '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        potholeindi: {
          "primary": "#FFFFFF",
          "primary-content": "#000000",
          "secondary": "#F3F4F6",
          "accent": "#374151",
          "neutral": "#1F2937",
          "base-100": "#FFFFFF",
          "base-200": "#F9FAFB",
          "base-300": "#E5E7EB",
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
  },
}