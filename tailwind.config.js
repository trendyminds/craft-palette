module.exports = {
	content: ['./src/templates/**/*', './scripts/**/*'],
	corePlugins: {
		preflight: false,
	},
	plugins: [require('@tailwindcss/forms')],
	prefix: 'cp-',
}
