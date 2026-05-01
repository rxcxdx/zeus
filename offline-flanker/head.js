import config from 'config'
import { MongoClient } from 'mongodb'
import util from 'util'

const MONGO_CONFIG = config.util.toObject(config.get('zeus.mongo'))
const client = new MongoClient(MONGO_CONFIG.url)
const db = client.db(MONGO_CONFIG.dbName)
const collection = db.collection(MONGO_CONFIG.collectionName)
const doc = await collection.findOne({}, { sort: [['dt', -1]] })
console.log(util.inspect(doc, { depth: 2 }))
await client.close()
