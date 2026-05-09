import config from 'config'
import util from "util";
import chalk from 'chalk';
import assert from 'node:assert/strict'
import { countBy } from 'lodash-es'
import dayjs from 'dayjs'

function getDia(dt) {
  return dayjs(dt).format('DD')
}

export function buildGrafico(registros) {
  registros.forEach((o) => {
    o.dia = getDia(o.dt)
  })
  const j = countBy(registros, 'dia')
  const lista = Object.entries(j).map(([dia, vendas]) => ({ dia, vendas }))
  lista.sort((a, b) => a.dia - b.dia)
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

export function rcdlog(entrada, depth) {
  if (config.get('zeus.logger.silentConsole')) return
  let str = util.inspect(entrada, { depth })
  str = chalk.yellowBright.bgBlack(str)
  console.log(str)
}

export function currency(v) {
  const { format } = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  return format(v)
}

import BigNumber from 'bignumber.js'

export function sumBySubtotal(arr) {
  return arr.reduce((acc, o) => acc.plus(o.subtotal), new BigNumber(0)).toNumber()
}

export function calcTotal(registro) {
  return sumBySubtotal(registro.cart)
}

/**
 * @param {object} item
 * @returns {number}
 */
export function calcSubtotalItem(item) {
  return BigNumber(item.valor).multipliedBy(item.quantidade).toNumber()
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {BigNumber}
 */
export function calcMargemLucro(a, b) {
  const piece = new BigNumber(a).minus(b).dividedBy(a)
  return new BigNumber(100).multipliedBy(piece).decimalPlaces(2)
}
