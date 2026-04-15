import { buildRelatorio } from '../src/utils.js'

const mock = [{ total: 10 }, { total: 10.12 }]
const o = buildRelatorio(mock)

test('buildRelatorio', () => {
  expect(o.total).toBe(20.12)
  expect(o.vendas).toBe(2)
})
