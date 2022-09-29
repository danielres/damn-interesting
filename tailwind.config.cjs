const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			dropShadow: {
				sharp: '0px 2px 1px #00000085',
			},
		},
	},

	plugins: [require('@tailwindcss/forms')],
}

module.exports = config
