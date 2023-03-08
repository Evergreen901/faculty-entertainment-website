/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
    theme: {
        extend: {
            screens: {
                mobile: '500px',
                tablet: '900px',
                laptop: '1440px',
            },
            fontSize: {
                // xl: ['22px', 1],
            },
            fontFamily: {
                inter: ['Inter', 'serif'],
            },
            colors: {
                gray: {
                    DEFAULT: '#F7F7F7',
                    500: '#333333',
                },
                cyan: {
                    500: '#29C2E2',
                },
                blue: {
                    500: '#2D4EF5',
                    opacity: '#2D4EF520',
                },
                black: {
                    DEFAULT: '#000000',
                    100: '#101010',
                },
                purple: {
                    DEFAULT: '#6e18a9',
                    100: '#A937F7',
                    400: '#451C7C',
                    500: '#0d0016',
                },
                yellow: {
                    100: '#FF9D00',
                },
                red: {
                    100: '#FF0076',
                },
            },
        },
    },
    plugins: [require('tw-elements/dist/plugin')],
};
