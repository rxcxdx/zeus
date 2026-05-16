import { calcSubtotalItem } from '../src/utils.js'

it('calcSubtotalItem Spec', () => {
  expect(calcSubtotalItem({ valor: 2, quantidade: 4 })).toBe(8)
})
