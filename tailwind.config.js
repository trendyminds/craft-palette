/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./scripts/**/*'],
	corePlugins: {
		preflight: false,
	},
	prefix: 'p-',
	important: true,
	screens: {
		xs: '480px',
		sm: '640px',
		md: '768px',
	},
}
