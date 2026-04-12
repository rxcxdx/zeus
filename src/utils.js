import assert from 'node:assert/strict'
import { sumBy, countBy, groupBy } from 'lodash-es'
import { BigNumber } from 'bignumber.js'
import dayjs from 'dayjs'

export function buildRelatorio(registros) {
  const total = registros
    .reduce((acc, o) => acc.plus(o.total), new BigNumber(0))
    .toNumber()
  return {
    vendas: registros.length,
    total: total
  }
}

export function buildGrafico(registros) {
  registros.forEach((o) => {
    o.dia = dayjs(o.dt).format('DD')
  })
  const j = countBy(registros, 'dia')
  const lista = Object.entries(j).map(([dia, vendas]) => ({ dia, vendas }))
  lista.sort((a, b) => a.dia - b.dia)
  return lista
}

export function buildItens(cart) {
  const j = groupBy(cart, 'descricao')
  const lista = Object.entries(j).map(([descricao, l]) => ({
    descricao,
    quantidade: sumBy(l, 'quantidade'),
    subtotal: sumBy(l, 'subtotal')
  }))
  lista.sort((a, b) => a.subtotal - b.subtotal).reverse()
  return lista
}

export function assertIsoMonth(v) {
  try {
    const regex = RegExp('^\\d{4}-\\d{2}$')
    assert(regex.test(v))
  } catch {
    throw new Error('isoMonth inválido')
  }
}

export function assertDecimalPlaces(v) {
  try {
    assert(new BigNumber(v).decimalPlaces() <= 2)
  } catch {
    throw new Error('decimalPlaces deve ser de no máximo duas casas decimais')
  }
}
