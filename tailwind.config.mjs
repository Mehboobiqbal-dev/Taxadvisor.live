/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',        // All files under src
    './pages/**/*.{js,ts,jsx,tsx}',       // All files under pages
    './components/**/*.{js,ts,jsx,tsx}',  // All files under components
    './app/**/*.{js,ts,jsx,tsx}',         // All files under app
    './content/**/*.{js,ts,jsx,tsx}',     // All files under content at the root
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
