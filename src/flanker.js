import assert from 'node:assert/strict'
import { MongoClient } from 'mongodb'
import config from 'config'
import cleanDeep from 'clean-deep'
import { logger } from './logger.js'
import { rcdebug } from './utils.js'

const url = config.get('dbConfig.url')
const client = new MongoClient(url, { serverSelectionTimeoutMS: 3000 })
const dbName = config.get('dbConfig.dbName')

try {
  logger.info('conectando mongo...')
  await client.connect()
} catch {
  logger.error('mongo nao conectado no servidor')
}

const db = client.db(dbName)
const collection = db.collection('vendas')

async function getVendas(a, b) {
  logger.debug(a)
  logger.debug(b)
  const query = {
    dt: {
      $gte: a,
      $lte: b
    }
  }
  const rs = await collection.find(query).toArray()
  return rs
}

async function getVendasRelatorio(formulario) {
  let query = {
    dt: {
      $gte: formulario.gte,
      $lte: formulario.lte
    },
    username: formulario.username
  }
  query = cleanDeep(query)

  rcdebug(query, 1)

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

async function getTimeline() {
  const options = {
    sort: [['dt', -1]],
    limit: 100,
    projection: {
      _id: true,
      username: true,            
      obs: true
    }
  }
  const rs = await collection.find({}, options).toArray()
  return rs
}

async function apagarVenda(_id) {
  const { deletedCount } = await collection.deleteOne({ _id })
  assert(deletedCount, 'nada foi apagado')
}

export default {
  getVendas,
  getVendasRelatorio,
  getVenda,
  gravarVenda,
  getTimeline,
  apagarVenda
}
