import dayjs from 'dayjs'
import * as z from 'zod'
import flanker from './flanker.js'
import { buildRelatorio } from './utils.js'

const schema = z.object({
  gte: z.iso.date().transform((val) => dayjs(val).startOf('d').toDate()),
  lte: z.iso.date().transform((val) => dayjs(val).endOf('d').toDate()),
  username: z.string().trim().optional()
})

export default async function endPointRelatorio(entrada) {
  const formulario = schema.parse(entrada)
  const registros = await flanker.getVendas(formulario.gte, formulario.lte, formulario.username)
  return buildRelatorio(registros)
}
