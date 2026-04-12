import dayjs from 'dayjs'
import * as z from 'zod'
import flanker from './flanker.js'
import buildVenda from './buildVenda.js'
import {
  buildGrafico,
  buildRelatorio,
  buildItens,
  assertIsoMonth
} from './utils.js'

export async function endPointGrafico(isoMonth) {
  assertIsoMonth(isoMonth)
  const j = dayjs(isoMonth)
  const registros = await flanker.getVendas(
    j.startOf('month').toDate(),
    j.endOf('month').toDate()
  )
  return buildGrafico(registros)
}

export async function endPointItens(body) {
  const schema = z.object({
    dia: z.iso.date(),
    descricao: z.string().trim().optional()
  })
  const formulario = schema.parse(body)
  const j = dayjs(formulario.dia)
  const registros = await flanker.getVendas(
    j.startOf('day').toDate(),
    j.endOf('day').toDate()
  )
  let cart = registros.flatMap((o) => o.cart)
  if (formulario.descricao) {
    cart = cart.filter((o) => o.descricao.includes(formulario.descricao))
  }
  return buildItens(cart)
}

export async function endPointRelatorio(body) {
  const schema = z.object({
    gte: z.iso.datetime().pipe(z.coerce.date()),
    lte: z.iso.datetime().pipe(z.coerce.date())
  })
  const formulario = schema.parse(body)
  const registros = await flanker.getVendas(formulario.gte, formulario.lte)
  return buildRelatorio(registros)
}

export async function endPointIndice(body) {
  const schema = z.object({
    gte: z.iso.datetime().pipe(z.coerce.date()),
    lte: z.iso.datetime().pipe(z.coerce.date())
  })
  const formulario = schema.parse(body)
  const registros = await flanker.getVendas(formulario.gte, formulario.lte)
  const resposta = []
  registros.forEach((o) => {
    resposta.push({
      _id: o._id,
      dt: o.dt,
      dt_fmt: dayjs(o.dt).format('DD/MM/YYYY HH:mm:ss.SSS')
    })
  })
  resposta.sort((a, b) => a.dt - b.dt).reverse()
  return resposta
}

export async function endPointBuy(body) {
  const novo = buildVenda(body)
  await flanker.gravarVenda(novo)
}
