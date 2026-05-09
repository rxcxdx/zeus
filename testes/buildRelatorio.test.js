import buildRelatorio from '../src/buildRelatorio.js'

const mock = [
  { total: 10, cart: [{ quantidade: 2 }] },
  { total: 10.12, cart: [{ quantidade: 1 }] },
  { total: 1, cart: [{ quantidade: 1 }] },
  { total: 1, cart: [{ quantidade: 1 }] },
  { total: 1, cart: [{ quantidade: 1 }] }
]

const resposta = buildRelatorio(mock)

test('buildRelatorio', () => {
  expect(resposta.total).toBe(23.12)
  expect(resposta.vendas).toBe(5)
  expect(resposta.itens).toBe(6)
})
