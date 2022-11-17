import adapter from '@sveltejs/adapter-node'
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: {
				configFilePath: './postcss.config.cjs',
			},
		}),
	],

	kit: {
		adapter: adapter({ precompress: true }),
		alias: {
			$can: 'src/lib/can.ts',
			$components: 'src/components',
			$constants: 'src/constants.ts',
			$dev: 'src/dev',
			$stores: 'src/stores',
			$types: 'src/types.d.ts',
		},
	},
}

export default config
