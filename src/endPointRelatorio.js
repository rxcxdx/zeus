import * as z from 'zod'
import flanker from './flanker.js'
import { buildRelatorio } from './utils.js'

const schema = z.object({
  gte: z.iso.datetime().pipe(z.coerce.date()),
  lte: z.iso.datetime().pipe(z.coerce.date())
})

export default async function endPointRelatorio(body) {
  const formulario = schema.parse(body)
  const registros = await flanker.getVendas(formulario.gte, formulario.lte)
  return buildRelatorio(registros)
}