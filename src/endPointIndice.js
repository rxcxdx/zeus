import dayjs from 'dayjs'
import * as z from 'zod'
import flanker from './flanker.js'

const TEMPLATE = 'DD/MM/YYYY HH:mm:ss.SSS'

const schema = z.object({
  gte: z.iso.datetime().pipe(z.coerce.date()),
  lte: z.iso.datetime().pipe(z.coerce.date())
})

export default async function endPointIndice(body) {
  const formulario = schema.parse(body)
  const registros = await flanker.getVendas(formulario.gte, formulario.lte)
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
