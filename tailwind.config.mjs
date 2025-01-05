/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary':'linear-gradient(to right, #16bffd, #cb3066)'
      },
      backgroundImage:{
        'hero': "url('/hero.jpg')",
      },
    },
  },
  plugins: [require('preline/plugin')],
};
