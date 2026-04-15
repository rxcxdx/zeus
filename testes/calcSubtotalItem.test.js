import { calcSubtotalItem } from '../src/matematica.js'

test('calcSubtotalItem', () => {  
  expect(calcSubtotalItem({ valor: 33.91, quantidade: 3 }).toNumber()).toBe(101.73)
})
