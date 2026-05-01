import { confirm } from '@inquirer/prompts'
import config from 'config'
import { MongoClient } from 'mongodb'

const client = new MongoClient(config.get('zeus.mongo.url'))
const db = client.db(config.get('zeus.mongo.dbName'))
const collection = db.collection(config.get('zeus.mongo.collectionName'))

const answer = await confirm({ message: 'Continuar?', default: false })

if (answer) {
  await collection.deleteMany({})
}

await client.close()
