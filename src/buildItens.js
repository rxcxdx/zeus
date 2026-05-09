import { sumBy, groupBy } from 'lodash-es'
import { sumBySubtotal } from './utils.js';

export default function buildItens(cart) {
  const j = groupBy(cart, 'descricao')
  const rs = Object.entries(j).map(([descricao, l]) => ({
    descricao,
    quantidade: sumBy(l, 'quantidade'),
    subtotal: sumBySubtotal(l)
  }))
  rs.sort((a, b) => a.subtotal - b.subtotal).reverse()
  return rs
}
