import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		outDir: './src/assetbundles/resources/',
		rolldownOptions: {
			input: [
				'./scripts/Init.jsx',
				'./scripts/access.js',
				'./styles/palette.css',
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
