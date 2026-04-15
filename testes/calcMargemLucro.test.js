import { calcMargemLucro } from '../src/matematica.js'

test('calcMargemLucro', () => {    
  expect(calcMargemLucro(2.83, 2).toNumber()).toBe(29.33)
})
