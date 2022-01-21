const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#161E2E',
				secondary: '#F0F1F5',
				'primary-dark': '#DDE3EE',
				'secondary-dark': '#0A0E15'
			},
			opacity: {
				2: '0.02'
			}
		}
	},

	plugins: []
};

module.exports = config;
