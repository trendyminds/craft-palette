const esbuild = require('esbuild')

const isProd = process.env.NODE_ENV === 'production'

esbuild
	.build({
		entryPoints: ['scripts/access.js', 'scripts/init.js'],
		bundle: true,
		minify: isProd,
		watch: !isProd,
		loader: { '.js': 'jsx' },
		outdir: 'src/assetbundles/resources',
	})
	.catch(() => process.exit(1))
