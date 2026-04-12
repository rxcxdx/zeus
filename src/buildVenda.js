import { nanoid } from 'nanoid'
import { sumBy } from 'lodash-es'
import { BigNumber } from 'bignumber.js'
import { schemaVenda } from './schemas.js'
import { calcSubtotalItem } from './matematica.js'

export default function buildVenda(entrada) {
  const novo = schemaVenda.parse(entrada)  
  let total = new BigNumber(0)
  novo.cart.forEach((o) => {
    const subtotal = calcSubtotalItem(o)
    o.subtotal = subtotal.toNumber()
    total = total.plus(subtotal)
  })
  novo.total = total.toNumber()
  novo.itens = sumBy(novo.cart, 'quantidade')
  novo._id = nanoid()
  novo.dt = new Date()
  return novo
}
