import config from 'config'
import util from "util";
import chalk from 'chalk';
import assert from 'node:assert/strict'
import { sumBy, countBy, groupBy } from 'lodash-es'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'

export function buildRelatorio(registros) {
  const total = registros.reduce((acc, o) => acc.plus(o.total), new BigNumber(0)).toNumber()
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
  const rs = Object.entries(j).map(([descricao, l]) => ({
    descricao,
    quantidade: sumBy(l, 'quantidade'),
    subtotal: l
      .reduce((acc, o) => acc.plus(o.subtotal), new BigNumber(0))
      .toNumber()
  }))
  rs.sort((a, b) => a.subtotal - b.subtotal).reverse()
  return rs
}

export function assertIsoMonth(v) {
  try {
    const regex = RegExp('^\\d{4}-\\d{2}$')
    assert(regex.test(v))
  } catch {
    throw new Error('isoMonth inválido')
  }
}

export function rcdlog(entrada, depth) {
  if (config.get('zeus.logger.silentConsole')) return
  let str = util.inspect(entrada, { depth })
  str = chalk.yellowBright.bgBlack(str)
  console.log(str)
}
