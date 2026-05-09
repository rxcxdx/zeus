import config from 'config'
import { MongoClient } from 'mongodb'

const IDENTIFIER = '189b2287-f85d-4eb2-aeb9-e2cae252ac70'

const client = new MongoClient(config.get('zeus.mongo.url'))
await client.connect()
const db = client.db(config.get('zeus.mongo.dbName'))
const collection = db.collection(config.get('zeus.mongo.collectionName'))
const filtro = {
  cart: { $elemMatch: { identifier: IDENTIFIER } }
}
const modificar = {
  $set: {
    'cart.$.obs': 'palmeiras'
  }
}
const o = await collection.updateOne(filtro, modificar)
console.log(o)
await client.close()
