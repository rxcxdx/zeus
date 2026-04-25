
import config from 'config'
import { MongoClient } from 'mongodb'

const VENDA = '7Su7d2eeVoGjp1E2i5j03'
const IDENTIFIER = 'ThZhc3QLz_7K-Dg_VguV7'

const MONGO_CONFIG = config.util.toObject(config.get('zeus.mongo'))
const client = new MongoClient(MONGO_CONFIG.url)
await client.connect()
const db = client.db(MONGO_CONFIG.dbName)
const collection = db.collection(MONGO_CONFIG.collectionName)
const filtro = { 
  _id: VENDA
}
const modificar = {
  $pull: { cart: { identifier: IDENTIFIER } }
}
const rs = await collection.updateOne(filtro, modificar)
console.log(rs)
await client.close()