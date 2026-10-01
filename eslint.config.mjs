import js from '@eslint/js'
import harmony from 'eslint-plugin-harmony'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig([
	{ ignores: ['cjs', 'dist*', 'esm', 'lib', 'out*', 'coverage', '.yarn'] },
	{
		files: ['**/*.js'],
		languageOptions: { sourceType: 'commonjs' },
		plugins: { harmony },
		extends: [js.configs.recommended, 'harmony/latest']
	},
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: { parserOptions: { project: 'tsconfig.json' } },
		plugins: { harmony },
		extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked, 'harmony/latest', 'harmony/ts-recommended-type-check']
	}
])
