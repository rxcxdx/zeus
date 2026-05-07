import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod'
import BigNumber from 'bignumber.js'
import { calcSubtotalItem } from './matematica.js'

const schemaItem = z.object({
  identifier: z.string().default(() => uuidv4()),
  valor: z.number().positive(),
  quantidade: z.int().positive(),
  descricao: z.string().min(1).trim(),
  obs: z.string().trim().optional()
})

const schemaVenda = z.object({
  username: z.string().min(1).trim(),
  cart: z.array(schemaItem).min(1),
  obs: z.string().trim().default('')
})

export function calcTotal(registro) {
  return registro.cart.reduce((acc, o) => acc.plus(o.subtotal), new BigNumber(0)).toNumber()
}

/**
 * Returns obj que vai ser inserido no mongo
 * @param {object} entrada
 * @returns {object}
 */
export function parseVenda(entrada) {
  const novo = schemaVenda.parse(entrada)
  novo.cart.forEach((o) => {
    o.subtotal = calcSubtotalItem(o)
  })
  novo.total = calcTotal(novo)
  novo._id = uuidv4()
  novo.dt = new Date()
  return novo
}
