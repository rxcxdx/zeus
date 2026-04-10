import dayjs from 'dayjs'
import { defaultTo, filter } from 'lodash-es'
import { schemaRelatorio, schemaIndice, schemaItens } from './schemas.js'
import flanker from './flanker.js'
import buildVenda from './build-venda/buildVenda.js'
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
  const formulario = schemaItens.parse(body)
  const j = dayjs(formulario.dia)
  const registros = await flanker.getVendas(
    j.startOf('day').toDate(),
    j.endOf('day').toDate()
  )
  const itens = buildItens(registros.flatMap((o) => o.cart))
  return filter(itens, (o) =>
    o.descricao.includes(defaultTo(formulario.descricao, ''))
  )
}

export async function endPointRelatorio(body) {
  const formulario = schemaRelatorio.parse(body)
  const registros = await flanker.getVendas(
    dayjs(formulario.gte).startOf('day').toDate(),
    dayjs(formulario.lte).endOf('day').toDate()
  )
  return buildRelatorio(registros)
}

export async function endPointIndice(body) {
  const formulario = schemaIndice.parse(body)
  const registros = await flanker.getVendas(
    dayjs(formulario.gte).startOf('day').toDate(),
    dayjs(formulario.lte).endOf('day').toDate()
  )
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
