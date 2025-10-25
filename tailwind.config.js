const colors = require("tailwindcss/colors");
const dbBlue = "#195D9C";
const dbDarkBlue = "#0F355A";

/** @type {import('tailwindcss').Config} */
/* eslint-env node */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "./node_modules/vue-tailwind/dist/*.js",
        './node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
        "./node_modules/vue-tailwind-datepicker/**/*.js",
    ],
    theme: {
        colors: {
            // ...colors,
            // 'blue': {
            //     ...colors.blue,
            //     400: dbBlue,
            //     800: dbDarkBlue,
            // },
        },
        // fontSize: {
        //     sm: '1rem',
        //     base: '1.25rem',
        //     xl: '1.5rem',
        //     '2xl': '1.563rem',
        //     '3xl': '1.953rem',
        //     '4xl': '2.441rem',
        //     '5xl': '3.052rem',
        // },
        extend: {
            colors: {
                "vtd-primary": colors.sky, // Light mode Datepicker color
                "vtd-secondary": colors.gray, // Dark mode Datepicker color
                'db-blue': dbBlue,
                'db-dark-blue': dbDarkBlue,
            },
        },
    },
    plugins: [require("@tailwindcss/forms"), require('flowbite/plugin')],
};
