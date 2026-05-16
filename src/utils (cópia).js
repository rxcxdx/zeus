import Decimal from 'decimal.js-light'
import config from 'config'
import util from 'util'
import chalk from 'chalk'
import dayjs from 'dayjs'
import { countBy } from 'lodash-es'
import sumByCurrency from './sumByCurrency.js'

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

export function rcdlog(entrada, depth) {
  if (config.get('zeus.logger.silentConsole')) return
  let str = util.inspect(entrada, { depth })
  str = chalk.yellowBright.bgBlack(str)
  console.log(str)
}

export function calcTotalVenda(registro) {
  const rs = sumByCurrency(registro.cart, 'subtotal')
  return rs
}

export function calcSubtotalItem(item) {
  return new Decimal(item.valor).mul(item.quantidade).toNumber()
}

export function calcMargemLucro(a, b) {
  const piece = new Decimal(a).minus(b).dividedBy(a)
  return new Decimal(100).mul(piece).toDecimalPlaces(2).toNumber()
}
