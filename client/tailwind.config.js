// client/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
    // The 'content' array tells Tailwind where to look for class names.
    // This configuration is perfect for a standard Vite + React project.
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        // You can add your custom theme settings here later if you want.
        // For example:
        // colors: {
        //   'brand-blue': '#1DA1F2',
        // },
      },
    },
    plugins: [
      // You can add Tailwind plugins here, like @tailwindcss/forms
    ],
  }