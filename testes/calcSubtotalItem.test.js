import { calcSubtotalItem } from '../src/utils.js'

test('calcSubtotalItem', () => {
  expect(calcSubtotalItem({ valor: 33.91, quantidade: 3 })).toBe(101.73)
})
