import sumByCurrency from '../src/sumByCurrency.js'

it('sumByCurrency Spec', () => {
  const dataSource = [{ subtotal: 10.12 }, { subtotal: 10 }]
  expect(sumByCurrency(dataSource, 'subtotal')).toBe(20.12)
})
