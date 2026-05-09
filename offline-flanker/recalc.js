import config from 'config'
import { MongoClient } from 'mongodb'
import { calcTotal } from '../src/utils.js'
import { input } from '@inquirer/prompts';

const VENDA = await input({ message: '_id?', required: true });
const MONGO_CONFIG = config.util.toObject(config.get('zeus.mongo'))
const client = new MongoClient(MONGO_CONFIG.url)
await client.connect()
const db = client.db(MONGO_CONFIG.dbName)
const collection = db.collection(MONGO_CONFIG.collectionName)
const registro = await collection.findOne({ _id: VENDA })
const filtro = {
  _id: VENDA
}
const modificar = {
  $set: {
    total: calcTotal(registro)
  }
}
const o = await collection.updateOne(filtro, modificar)
console.log(o)
console.log(o.modifiedCount ? 'modificado' : 'nada modificado')
await client.close()
