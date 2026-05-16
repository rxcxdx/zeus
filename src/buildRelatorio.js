import { sumBy, flatMap } from 'lodash-es'
import sumByCurrency from './sumByCurrency.js'

function getItens(registros) {
  const cart = flatMap(registros, 'cart')
  return sumBy(cart, 'quantidade')
}

export default function buildRelatorio(registros) {
  const dto = {
    vendas: registros.length,
    total: sumByCurrency(registros, 'total'),
    itens: getItens(registros)
  }
  return dto
}
