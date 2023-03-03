const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultTheme.fontFamily.sans],
			serif: ['Merriweather', ...defaultTheme.fontFamily.serif]
		},
		extend: {}
	},
	plugins: []
};
