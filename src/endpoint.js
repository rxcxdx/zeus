import dayjs from 'dayjs'
import * as z from 'zod'
import { schemaVenda } from './schemas.js'
import flanker from './flanker.js'
import {
  buildGrafico,
  buildRelatorio,
  buildIndice,
  buildVenda,
  buildItens
} from './utils.js'
import { nanoid } from 'nanoid'

export async function endPointGrafico(isoMonth) {
  const j = dayjs(isoMonth)
  const a = j.startOf('month').toDate()
  const b = j.endOf('month').toDate()
  const registros = await flanker.getVendas(a, b)
  return buildGrafico(registros)
}

export async function endPointItens(isoDate) {
  const j = dayjs(isoDate)
  const a = j.startOf('day').toDate()
  const b = j.endOf('day').toDate()
  const registros = await flanker.getVendas(a, b)
  return buildItens(registros.flatMap((o) => o.cart))
}







const schemaRelatorio = z.object({
  gte: z.iso.datetime({ offset: true }).pipe(z.coerce.date()),
  lte: z.iso.datetime({ offset: true }).pipe(z.coerce.date()),
  username: z.string().trim().optional()
})




export async function endPointRelatorio(body) {
  const formulario = schemaRelatorio.parse(body)
  const registros = await flanker.getVendasRelatorio(formulario)
  return buildRelatorio(registros)
}

const schemaIndice = z.object({
  gte: z.iso.datetime({ offset: true }).pipe(z.coerce.date()),
  lte: z.iso.datetime({ offset: true }).pipe(z.coerce.date())
})

export async function endPointIndice(body) {
  const formulario = schemaIndice.parse(body)
  const registros = await flanker.getVendas(formulario.gte, formulario.lte)
  return buildIndice(registros)
}

export async function endPointVenda(_id) {
  const registro = await flanker.getVenda(_id)
  return buildVenda(registro)
}

export async function endPointBuy(body) {
  const o = schemaVenda.parse(body)
  o._id = nanoid()
  o.dt = new Date()
  await flanker.gravarVenda(o)
  return { _id: o._id, dt: o.dt }
}
