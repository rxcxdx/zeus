import config from 'config'
import assert from 'node:assert/strict'
import { MongoClient } from 'mongodb'
import check from 'check-types'
import logger from './logger.js'

const client = new MongoClient('mongodb://localhost:27017', {
  serverSelectionTimeoutMS: 3000
})

try {
  logger.debug('conectando mongo...')
  await client.connect()
  logger.info('mongo conectado')
} catch {
  logger.warn('mongo nao conectado no servidor')
}

const db = client.db(config.get('zeus.mongo.dbName'))
const collection = db.collection('vendas')

async function getVendas(gte, lte) {
  check.assert.date(gte, 'flanker getVendas recebeu errado gte')
  check.assert.date(lte, 'flanker getVendas recebeu errado lte')
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

async function editarDt(formulario) {
  const filtro = {
    _id: formulario._id
  }
  const modificar = {
    $set: { dt: formulario.dt }
  }
  const { modifiedCount } = await collection.updateOne(filtro, modificar)
  assert(modifiedCount, 'nada foi alterado')
}

async function getStats() {
  const stats = await db.stats()
  return stats
}

export default {
  getVenda,
  getVendas,
  gravarVenda,
  getTimelineVendas,
  apagarVenda,
  editarDt,
  getTimelineItens,
  getStats
}
