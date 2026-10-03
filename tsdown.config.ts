import { writeFile } from 'node:fs/promises'
import { defineConfig } from 'tsdown'

const entry = ['ts/index.ts']

// Two outputs, matching the `exports` map in package.json:
//   esm/  — the ESM build plus the .d.ts that `types` points at
//   cjs/  — the CommonJS build, marked commonjs by its own package.json
export default defineConfig([
	{
		entry,
		format: 'esm',
		outDir: 'esm',
		outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
		dts: true,
		sourcemap: true,
		// Mirror the source tree rather than bundling, so the ESM output keeps the
		// per-module shape tsc used to emit and stays tree-shakeable downstream.
		unbundle: true
	},
	{
		entry,
		format: 'cjs',
		outDir: 'cjs',
		outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
		dts: true,
		sourcemap: true,
		hooks: {
			// The package root is `"type": "module"`, so cjs/index.js is only read as
			// CommonJS because of this marker. tsdown's `copy` treats `to` as a
			// directory, which is why this is written rather than copied.
			'build:done': () => writeFile('cjs/package.json', '{ "type": "commonjs" }\n')
		}
	}
])
