import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: './src/assetbundles/resources/',
		rollupOptions: {
			input: [
				'./scripts/Init.jsx',
				'./scripts/access.js',
				'./styles/palette.pcss',
			],
			output: {
				entryFileNames: `[name].js`,
				chunkFileNames: `[name].js`,
				assetFileNames: `[name].[ext]`,
			},
			plugins: [
				{
					name: 'wrap-iife',
					generateBundle(options, bundle) {
						for (const chunk of Object.values(bundle)) {
							if (chunk.code) {
								chunk.code = `(function(){\n${chunk.code}\n})()`
							}
						}
					},
				},
			],
		},
	},
})
