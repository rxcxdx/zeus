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
try {
  registros.forEach((o) => {
    check.assert.date(o.dt, o._id)
    check.assert.number(o.total, o._id)
  })
  console.log('Lista de vendas é válida!')
} catch (error) {
  console.log('lista inválida')
  console.log(error.message)
}
