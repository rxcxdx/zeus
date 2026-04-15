import config from 'config'
import { MongoClient } from 'mongodb'
import check from 'check-types'

const MONGO_CONFIG = config.util.toObject(config.get('zeus.mongo'))
const client = new MongoClient(MONGO_CONFIG.url, {
  serverSelectionTimeoutMS: 3000
})
await client.connect()
const db = client.db(MONGO_CONFIG.dbName)
const collection = db.collection(MONGO_CONFIG.collectionName)

const registros = await collection.find({}).toArray()
await client.close()
const cart = registros.flatMap((o) => o.cart)
try {
  cart.forEach((o) => {
    check.assert.number(o.subtotal, o.identifier)
  })
  console.log('Lista de itens é válida!')
} catch (error) {
  console.log('lista inválida')
  console.log(error.message)
}
