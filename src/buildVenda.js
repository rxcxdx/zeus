import { nanoid } from 'nanoid'
import { sumBy } from 'lodash-es'
import BigNumber from 'bignumber.js'
import { schemaVenda } from './schemas.js'
import { calcSubtotalItem } from './matematica.js'

export function calcItens(cart) {
  return sumBy(cart, 'quantidade')
}

export function calcTotal(registro) {
  return registro.cart.reduce((acc, o) => acc.plus(o.subtotal), new BigNumber(0)).toNumber()
}

/**
 * Returns obj que vai ser inserido no mongo
 * @param {object} entrada
 * @returns {object}
 */
export function buildVenda(entrada) {
  const novo = schemaVenda.parse(entrada)
  novo.cart.forEach((o) => {    
    o.subtotal = calcSubtotalItem(o)
  })
  novo.itens = calcItens(novo.cart)
  novo.total = calcTotal(novo)
  novo._id = nanoid()
  novo.dt = new Date()
  return novo
}
