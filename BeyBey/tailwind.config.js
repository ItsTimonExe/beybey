/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                switzal: ['Switzal', 'sans-serif'],
            },
            keyframes: {
                'fade-in-down': {
                    "from": {
                        transform: "translateY(-0.75rem)",
                        opacity: '0'
                    },
                    "to": {
                        transform: "translateY(0rem)",
                        opacity: '1'
                    },
                },
                'slide-in-up': {
                    '0%': {
                        transform: "translateY(20px)",
                        opacity: '0',
                    },
                    '100%': {
                        transform: "translateY(0)",
                        opacity: '1',
                    },
                },
                'zoom-in': {
                    '0%': {
                        transform: "scale(0.9)",
                        opacity: '0',
                    },
                    '100%': {
                        transform: "scale(1)",
                        opacity: '1',
                    },
                },
            },
            animation: {
                'fade-in-down': "fade-in-down 0.2s ease-in-out both",
                'slide-in-up': "slide-in-up 0.7s ease-out both",
                'zoom-in': "zoom-in 0.5s ease-in-out both",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
