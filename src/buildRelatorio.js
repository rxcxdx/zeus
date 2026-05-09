import BigNumber from 'bignumber.js'
import { sumBy, flatMap } from 'lodash-es'

function getTotal(registros) {
  return registros.reduce((acc, o) => acc.plus(o.total), new BigNumber(0)).toNumber()
}

function getItens(registros) {
  const j = flatMap(registros, 'cart')    
  return sumBy(j, 'quantidade')
}

export default function buildRelatorio(registros) {
  const dto = {
    vendas: registros.length,
    total: getTotal(registros),
    itens: getItens(registros)
  }
  return dto
}
