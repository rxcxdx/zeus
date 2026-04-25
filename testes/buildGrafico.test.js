import { buildGrafico } from '../src/utils.js'

const mock = [
  { dt: new Date('2026-03-06T12:12:12.000Z') },
  { dt: new Date('2026-03-06T14:14:14.000Z') }
]
const grafico = buildGrafico(mock)
const resposta = grafico[0]
test('buildGrafico', () => {
  expect(resposta.dia).toBe('06')
  expect(resposta.vendas).toBe(2)
})