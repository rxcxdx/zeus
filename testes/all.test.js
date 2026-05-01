import { assertIsoMonth } from '../src/utils.js'

test('assertIsoMonth', () => {
  expect(() => assertIsoMonth('2025')).toThrow()
  expect(() => assertIsoMonth('2025-12')).not.toThrow()
})
