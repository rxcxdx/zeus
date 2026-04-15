import config from 'config'
import { MongoClient } from 'mongodb'
import util from 'util'

const MONGO_CONFIG = config.util.toObject(config.get('zeus.mongo'))
const client = new MongoClient(MONGO_CONFIG.url, {
  serverSelectionTimeoutMS: 3000
})
await client.connect()
const db = client.db(MONGO_CONFIG.dbName)
const collection = db.collection(MONGO_CONFIG.collectionName)

const doc = await collection.findOne({}, { sort: [['dt', -1]] })
await client.close()
console.log(util.inspect(doc, { depth: 1 }))
