import dayjs from 'dayjs'
import * as z from 'zod'
import { flatMap, filter } from 'lodash-es'
import flanker from './flanker.js'
import { buildItens } from './utils.js'

const schema = z.object({
  dia: z.iso.date(),
  descricao: z.string().optional()
})

function filtro(cart, descricao) {
  if (!descricao) return cart
  return filter(cart, (o) => o.descricao.includes(descricao))
}

export default async function endPointItens(body) {
  const formulario = schema.parse(body)
  const j = dayjs(formulario.dia)
  const registros = await flanker.getVendas(
    j.startOf('day').toDate(),
    j.endOf('day').toDate()
  )
  const cart = filtro(flatMap(registros, 'cart'), formulario.descricao)
  return buildItens(cart)
}