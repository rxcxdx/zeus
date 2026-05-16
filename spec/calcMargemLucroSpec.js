import { calcMargemLucro } from '../src/utils.js'

it('calcMargemLucro Spec', () => {
  expect(calcMargemLucro(2.83, 2)).toBe(29.33)
})
