import config from 'config'
import { MongoClient } from 'mongodb'
import { input } from '@inquirer/prompts'

const IDENTIFIER = await input({ message: 'identifier?', required: true })
const MONGO_CONFIG = config.util.toObject(config.get('zeus.mongo'))
const client = new MongoClient(MONGO_CONFIG.url)
await client.connect()
const db = client.db(MONGO_CONFIG.dbName)
const collection = db.collection(MONGO_CONFIG.collectionName)
const filtro = {
  cart: { $elemMatch: { identifier: IDENTIFIER } }
}
const o = await collection.deleteOne(filtro)
console.log(o)
await client.close()
