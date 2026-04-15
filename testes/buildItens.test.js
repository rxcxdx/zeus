import { buildItens } from '../src/utils.js'

const mock = [
  { descricao: 'ovo', quantidade: 1, subtotal: 1 },
  { descricao: 'ovo', quantidade: 2, subtotal: 2 },
]

const itens = buildItens(mock)
const alvo = itens[0]

test('buildItens', () => {
  expect(alvo.quantidade).toBe(3)
  expect(alvo.subtotal).toBe(3)
})
