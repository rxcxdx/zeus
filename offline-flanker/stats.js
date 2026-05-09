import config from 'config'
import { MongoClient } from 'mongodb'

// config.get('zeus.mongo.url')
// config.get('zeus.mongo.dbName')
// config.get('zeus.mongo.collectionName')

const client = new MongoClient(config.get('zeus.mongo.url'))
await client.connect()
const db = client.db(config.get('zeus.mongo.dbName'))
const stats = await db.stats()
console.log(stats)
await client.close()
