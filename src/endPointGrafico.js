import dayjs from 'dayjs'
import flanker from './flanker.js'
import { buildGrafico, assertIsoMonth } from './utils.js'

export default async function endPointGrafico(isoMonth) {
  assertIsoMonth(isoMonth)
  const j = dayjs(isoMonth)
  const registros = await flanker.getVendas(
    j.startOf('month').toDate(),
    j.endOf('month').toDate()
  )
  return buildGrafico(registros)
}