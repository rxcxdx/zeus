import dayjs from 'dayjs'
import * as z from 'zod'
import flanker from './flanker.js'
import buildRelatorio from './buildRelatorio.js'

const schema = z.object({
  gte: z.iso.date().transform((v) => dayjs(v).startOf('d').toDate()),
  lte: z.iso.date().transform((v) => dayjs(v).endOf('d').toDate()),
  username: z.string().trim().optional()
})

export default async function endPointRelatorio(entrada) {
  const formulario = schema.parse(entrada)
  const registros = await flanker.getVendas(formulario.gte, formulario.lte, formulario.username)
  return buildRelatorio(registros)
}
