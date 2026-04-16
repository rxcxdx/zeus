import { buildRelatorio } from '../src/utils.js'

const mock = [
  { total: 10 },
  { total: 10.12 },
  { total: 1 },
  { total: 1 },
  { total: 1 }
]

const resposta = buildRelatorio(mock)

test('buildRelatorio', () => {
  expect(resposta.total).toBe(23.12)
  expect(resposta.vendas).toBe(5)
})