import { filter, isEmpty } from 'lodash-es'
import { buildRelatorio } from './src/utils.js'
import { calcTotalVenda } from './src/matematica.js'

test('calcTotalVenda', () => {
 const mockVenda = {
    cart: [
      {
        valor: 10.12,
        quantidade: 2
      }
    ]
  }
  expect(calcTotalVenda(mockVenda)).toBe(20.24)
})

test('buildRelatorio', () => {
  const mock = [
    { cart: [{ valor: 10, quantidade: 1 }] },
    { cart: [{ valor: 10.12, quantidade: 1 }] },
    {
      cart: [
        { valor: 1, quantidade: 1 },
        { valor: 1, quantidade: 1 }
      ]
    },
    { cart: [{ valor: 1, quantidade: 2 }] }
  ]
  const o = buildRelatorio(mock)
  expect(o.vendas).toBe(4)
  expect(o.total).toBe(24.12)
})

test('vazio', () => {
  expect(isEmpty({})).toBeTruthy()
  expect(isEmpty([])).toBeTruthy()
})

/*
test('etc', () => {
  expect(() => assertIsoMonth('2025')).toThrow()
  expect(() => assertIsoMonth('2025-12')).not.toThrow()
})
*/

test('filtragem1', () => {
  const matrix = ['banana', 'verde_banana', 'bananada', 'zebra', 'BANANA']
  const v = filter(matrix, (v) => v.includes('banana'))
  expect(v.length).toBe(3)
})

test('filtragem2', () => {
  const matrix = ['banana', 'verde_banana', 'bananada', 'zebra', 'BANANA']
  const regex = RegExp('banana', 'i')
  const v = filter(matrix, (v) => regex.test(v))
  expect(v.length).toBe(4)
})

test('core', () => {
  // Number.isFinite()
  // Number.isInteger()
  // Number.parseFloat()
  expect(Number.parseInt('')).toBeNaN()
  expect(Number.parseInt('kkkk')).toBeNaN()
  expect(Number.parseInt('1.234')).toBe(1)
  expect(Number.parseInt('1,234')).toBe(1)
})
