import { sumBy, groupBy } from 'lodash-es'

export default function buildItens(cart) {
  const j = groupBy(cart, 'descricao')
  const rs = Object.entries(j).map(([descricao, l]) => ({
    descricao,
    quantidade: sumBy(l, 'quantidade')
  }))
  rs.sort((a, b) => a.quantidade - b.quantidade).reverse()
  return rs
}
