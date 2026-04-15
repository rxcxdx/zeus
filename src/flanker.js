import config from 'config'
import assert from 'node:assert/strict'
import { MongoClient } from 'mongodb'
import check from 'check-types'
import * as z from 'zod'
import logger from './logger.js'

const MONGO_CONFIG = config.util.toObject(config.get('zeus.mongo'))

const client = new MongoClient(MONGO_CONFIG.url, {
  serverSelectionTimeoutMS: 5000
})

try {
  logger.debug('conectando mongo...')
  await client.connect()
  logger.info('mongo conectado')
} catch {
  logger.warn('mongo nao conectado no servidor')
}

const db = client.db(MONGO_CONFIG.dbName)
const collection = db.collection(MONGO_CONFIG.collectionName)

async function getVendas(gte, lte) {
  check.assert.date(gte)
  check.assert.date(lte)
  logger.debug(gte)
  logger.debug(lte)
  const query = {
    dt: {
      $gte: gte,
      $lte: lte
    }
  }
  const rs = await collection.find(query).toArray()
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
    limit: 100,
    projection: { cart: false },
    sort: [['dt', -1]]
  }
  const rs = await collection.find({}, options).toArray()
  return rs
}

async function getTimelineItens() {
  const options = {
    limit: 150,
    sort: [['dt', -1]]
  }
  const registros = await collection.find({}, options).toArray()
  return registros.flatMap((o) => o.cart)
}

async function apagarVenda(_id) {
  const { deletedCount } = await collection.deleteOne({ _id })
  assert(deletedCount, 'nada foi apagado')
}

async function getStats() {
  const stats = await db.stats()
  return stats
}

async function editarVenda(entrada) {
  const schema = z.object({
    _id: z.string(),
    dt: z.coerce.date(),
    username: z.string().optional(),
    obs: z.string().optional()
  })
  const o = schema.parse(entrada)
  const filtro = {
    _id: o._id
  }
  const modificar = {
    $set: o
  }
  const rs = await collection.updateOne(filtro, modificar)
  return rs
}

async function editarItem(entrada) {
  const schema = z.object({
    identifier: z.string(),
    obs: z.string()
  })
  const o = schema.parse(entrada)
  const filtro = {
    cart: { $elemMatch: { identifier: o.identifier } }
  }
  const modificar = {
    $set: {
      'cart.$.obs': o.obs
    }
  }
  const rs = await collection.updateOne(filtro, modificar)
  return rs
}

export default {
  getVenda,
  getVendas,
  gravarVenda,
  getTimelineVendas,
  apagarVenda,
  editarVenda,
  editarItem,
  getTimelineItens,
  getStats
}
