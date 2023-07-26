/** @type {import('tailwindcss').Config}*/
const config = {
   content: ['./src/**/*.{html,js,svelte,ts}'],

   theme: {
      fontSize: {
         xxs: ['10px', '14px'],
         xs: ['12px', '16px'],
         sm: ['14px', '20px'],
         base: ['16px', '24px'],
         lg: ['20px', '28px'],
         xl: ['24px', '32px'],
         '2xl': ['28px', '36px'],
         '3xl': ['48px', '64px'],
         '4xl': ['82px', '120px'],
      },
      extend: {}
   },

   plugins: []
};

module.exports = config;
