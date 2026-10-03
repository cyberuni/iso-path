import t from 'node:assert'
import { detectPathFormat } from './detectPathStyle.js'

test('detects UNC format', () => {
  t.strictEqual(detectPathFormat('\\\\server\\drive\\some-path\\x.txt'), 'unc')
})
