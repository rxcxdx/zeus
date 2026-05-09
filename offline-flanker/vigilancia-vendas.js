import config from 'config'
import { MongoClient } from 'mongodb'
import check from 'check-types'

const client = new MongoClient(config.get('zeus.mongo.url'))
await client.connect()
const db = client.db(config.get('zeus.mongo.dbName'))
const collection = db.collection(config.get('zeus.mongo.collectionName'))
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
