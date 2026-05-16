import assert from 'node:assert/strict'
import dayjs from 'dayjs'
import flanker from './flanker.js'
import { buildGrafico } from './utils.js'
import isISOmonth from './isISOmonth.js'

export default async function endPointGrafico(isoMonth) {
  assert(isISOmonth(isoMonth), 'isoMonth inválido')
  const j = dayjs(isoMonth)
  const registros = await flanker.getVendas(
    j.startOf('month').toDate(),
    j.endOf('month').toDate(),
    undefined
  )
  return buildGrafico(registros)
}
