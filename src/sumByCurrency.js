import Decimal from 'decimal.js-light'
import { get } from 'lodash-es'

export default function sumByCurrency(dataSource, path) {
  return dataSource
    .reduce((acc, o) => acc.plus(get(o, path)), new Decimal(0))
    .toNumber()
}
