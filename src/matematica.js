import { BigNumber } from 'bignumber.js'

function calcSubtotalItemCore(valor, quantidade) {
  return new BigNumber(valor).multipliedBy(quantidade).toNumber()
}

export function calcSubtotalItem(o) {
  return calcSubtotalItemCore(o.valor, o.quantidade)
}

function somarCart(cart) {
  return cart
    .reduce((acc, o) => acc.plus(calcSubtotalItem(o)), new BigNumber(0))
    .toNumber()
}

export function calcTotalVenda(o) {
  return somarCart(o.cart)
}

export function calcMargemLucro(alpha, beta) {
  const piece = new BigNumber(alpha).minus(beta).dividedBy(alpha)
  const margemLucro = new BigNumber(100).multipliedBy(piece).decimalPlaces(2)
  return {
    alpha,
    beta,
    margemLucro: margemLucro.toNumber(),
    margemLucroFmt: margemLucro.toFormat({
      decimalSeparator: ',',
      suffix: ' %'
    })
  }
}
