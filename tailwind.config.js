/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Include all the files under src
    './pages/**/*.{js,ts,jsx,tsx}', // If you still have a pages folder
    './components/**/*.{js,ts,jsx,tsx}', // Include the components folder
    './app/**/*.{js,ts,jsx,tsx}', // Include the app folder if needed
    './content/**/*.{js,ts,jsx,tsx}', // Include the content folder from the root directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
