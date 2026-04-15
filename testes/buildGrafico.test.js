import check from 'check-types'
import { buildGrafico } from '../src/utils.js'

const mock = [
  { dt: new Date('2026-03-06T12:12:12.000Z') },
  { dt: new Date('2026-03-05T15:15:15.000Z') },
  { dt: new Date('2026-03-06T14:14:14.000Z') }
]

const resposta = [
  { dia: '05', vendas: 1 },
  { dia: '06', vendas: 2 }
]

const grafico = buildGrafico(mock)

test('buildGrafico', () => {
  expect(check.identical(grafico, resposta)).toBeTruthy()
})
