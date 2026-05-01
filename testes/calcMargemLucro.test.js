import { calcMargemLucro } from '../src/matematica.js'

const resposta = calcMargemLucro(2.83, 2).toNumber()

test('calcMargemLucro', () => {
  expect(resposta).toBe(29.33)
})
