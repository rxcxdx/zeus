import config from 'config'
import { MongoClient } from 'mongodb'
import { input } from '@inquirer/prompts';

const IDENTIFIER = await input({ message: 'identifier?', required: true });
const OBS = await input({ message: 'obs?', default: '' });
const MONGO_CONFIG = config.util.toObject(config.get('zeus.mongo'))
const client = new MongoClient(MONGO_CONFIG.url)
await client.connect()
const db = client.db(MONGO_CONFIG.dbName)
const collection = db.collection(MONGO_CONFIG.collectionName)
const filtro = {
  cart: { $elemMatch: { identifier: IDENTIFIER } }
}
const modificar = {
  $set: {
    'cart.$.obs': OBS
  }
}
const o = await collection.updateOne(filtro, modificar)
console.log(o)
await client.close()
