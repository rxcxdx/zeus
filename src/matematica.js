import BigNumber from 'bignumber.js'

/**
 * @param {object} item
 * @returns {number}
 */
export function calcSubtotalItem(item) {
  return BigNumber(item.valor).multipliedBy(item.quantidade).toNumber()
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {BigNumber}
 */
export function calcMargemLucro(a, b) {
  const piece = new BigNumber(a).minus(b).dividedBy(a)
  return new BigNumber(100).multipliedBy(piece).decimalPlaces(2)
}
