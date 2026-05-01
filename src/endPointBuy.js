import flanker from './flanker.js'
import { parseVenda } from './parse-venda.js'

export default async function endPointBuy(body) {
  const o = parseVenda(body)
  await flanker.gravarVenda(o)
}
