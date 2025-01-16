const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js",
	],
	theme: {
		extend: {
			colors: {
				primary: "#e60000",
				"dark-primary": "#b30000",
				"dark-bg": "#140000",
				"light-bg": "#FFFFFF",
				"black-font": "#000000",
				"white-font": "#FFFFFF",
				"light-gray": "#F7F7F7",
				"dark-gray": "#333333",
				"dark-success": "#27ae60",
				"light-success": "#2ecc71",
			},
		},
	},
	plugins: [nextui()],
};
