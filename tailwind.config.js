const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_1000 = { ...Array.from(Array(1001)).map((_, i) => `${i}px`) };

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			margin: px0_200,
			padding: px0_200,
			maxWidth: px0_1000,
			borderWidth: px0_100,
			height: px0_1000,
			fontSize:px0_100,
			borderRadius:px0_100,
			gap:px0_100,
			width:px0_1000
		},
	},
	plugins: [],
};
