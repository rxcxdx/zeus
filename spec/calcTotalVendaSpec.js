import { calcTotalVenda } from '../src/utils.js'

it('calcTotalVenda Spec', () => {
  const registro = {
    cart: [{ subtotal: 2 }, { subtotal: 1 }]
  }
  expect(calcTotalVenda(registro)).toBe(3)
})
