import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		// `test` and `expect` stay global, as they were under jest, so the specs
		// need no per-file imports.
		globals: true,
		environment: 'node',
		include: ['ts/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			include: ['ts/**/*.ts'],
			exclude: ['ts/**/*.spec.ts'],
			reporter: ['text', 'lcov'],
			// Pinned at what the package already meets (detectPathFormat has an
			// untested fall-through branch), so a drop fails the build
			// instead of quietly showing up in a coverage report.
			thresholds: {
				branches: 50,
				functions: 100,
				lines: 100,
				statements: 100
			}
		}
	}
})
