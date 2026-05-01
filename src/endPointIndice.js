import dayjs from 'dayjs'
import * as z from 'zod'
import flanker from './flanker.js'

const TEMPLATE = 'DD/MM/YYYY HH:mm:ss.SSS'

const schema = z.object({
  gte: z.iso.date().transform((val) => dayjs(val).startOf('d').toDate()),
  lte: z.iso.date().transform((val) => dayjs(val).endOf('d').toDate())
})

export default async function endPointIndice(entrada) {
  const formulario = schema.parse(entrada)
  const registros = await flanker.getVendas(formulario.gte, formulario.lte, undefined)
  const resposta = []
  registros.forEach((o) => {
    resposta.push({
      _id: o._id,
      dt: o.dt,
      dt_fmt: dayjs(o.dt).format(TEMPLATE)
    })
  })
  resposta.sort((a, b) => a.dt - b.dt).reverse()
  return resposta
}
