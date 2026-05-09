import flanker from './flanker.js'
import { parseVenda } from './parse-venda.js'
import { currency } from './utils.js'

export default async function endPointBuy(body) {
  const o = parseVenda(body)
  await flanker.gravarVenda(o)  
  return { _id: o._id, total: currency(o.total) }
}
