import assert from 'node:assert/strict'
import config from 'config'
import { MongoClient } from 'mongodb'
import { calcTotal } from '../src/parse-venda.js'

const VENDA = '7Su7d2eeVoGjp1E2i5j03'
const MONGO_CONFIG = config.util.toObject(config.get('zeus.mongo'))
const client = new MongoClient(MONGO_CONFIG.url)
try {
  await client.connect()
  const db = client.db(MONGO_CONFIG.dbName)
  const collection = db.collection(MONGO_CONFIG.collectionName)
  const registro = await collection.findOne({ _id: VENDA })
  assert(registro, 'venda não existe')
  const filtro = {
    _id: VENDA
  }
  const modificar = {
    $set: {
      total: calcTotal(registro)
    }
  }
  const rs = await collection.updateOne(filtro, modificar)
  console.log(rs)
} catch (error) {
  console.log(error.name)
  console.log(error.message)
} finally {
  await client.close()
}
