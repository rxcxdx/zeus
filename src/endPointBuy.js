import flanker from './flanker.js'
import {buildVenda} from './buildVenda.js'

export default async function endPointBuy(body) {
  const o = buildVenda(body)
  await flanker.gravarVenda(o)
}