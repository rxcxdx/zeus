import config from 'config'
import assert from 'node:assert/strict'
import { MongoClient } from 'mongodb'
import check from 'check-types'
import * as z from 'zod'
import clean from 'clean-deep'
import logger from './logger.js'

const client = new MongoClient(config.get('zeus.mongo.url'), {
  serverSelectionTimeoutMS: 5000
})

try {
  logger.debug('conectando mongo...')
  await client.connect()
  logger.info('mongo conectado')
} catch {
  logger.warn('mongo nao conectado no servidor')
}

const db = client.db(config.get('zeus.mongo.dbName'))
const collection = db.collection(config.get('zeus.mongo.collectionName'))

async function getVendas(gte, lte, username) {
  check.assert.date(gte)
  check.assert.date(lte)
  logger.debug(gte)
  logger.debug(lte)
  const filtro = {
    dt: { $gte: gte, $lte: lte },
    username
  }
  const rs = await collection.find(clean(filtro)).toArray()
  return rs
}

async function getVenda(_id) {
  const registro = await collection.findOne({ _id })
  assert(registro, 'venda não existe')
  return registro
}

async function gravarVenda(o) {
  await collection.insertOne(o)
}

async function getTimelineVendas() {
  const options = {
    limit: 10,
    projection: { cart: false },
    sort: [['dt', -1]]
  }
  const rs = await collection.find({}, options).toArray()
  return rs
}

async function getTimelineItens() {
  const options = {
    limit: 30,
    sort: [['dt', -1]]
  }
  const registros = await collection.find({}, options).toArray()
  return registros.flatMap((o) => o.cart)
}

async function apagarVenda(_id) {
  const { deletedCount } = await collection.deleteOne({ _id })
  assert(deletedCount, 'nada foi apagado')
}

async function editarVenda(entrada) {
  const schema = z.object({
    _id: z.string(),
    dt: z.coerce.date().optional(),
    username: z.string().optional(),
    obs: z.string().optional(),
  })
  const formulario = schema.parse(entrada)
  const filtro = {
    _id: formulario._id
  }
  const modificar = {
    $set: formulario
  }
  const o = await collection.updateOne(filtro, modificar)
  assert(o.matchedCount, 'venda não existe')
  return o
}

async function editarItem(entrada) {
  const schema = z.object({
    identifier: z.string(),
    obs: z.string()
  })
  const formulario = schema.parse(entrada)
  const filtro = {
    cart: { $elemMatch: { identifier: formulario.identifier } }
  }
  const modificar = {
    $set: {
      'cart.$.obs': formulario.obs
    }
  }
  const o = await collection.updateOne(filtro, modificar)
  assert(o.matchedCount, 'venda não existe')
  return o
}

export default {
  getVenda,
  getVendas,
  gravarVenda,
  getTimelineVendas,
  apagarVenda,
  editarVenda,
  editarItem,
  getTimelineItens
}
