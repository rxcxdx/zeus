import config from 'config'
import { MongoClient } from 'mongodb'
import util from 'util'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv))
  .option('identifier', { type: 'string', alias: 'i', demandOption: true })
  .parse()
const MONGO_CONFIG = config.util.toObject(config.get('zeus.mongo'))
const client = new MongoClient(MONGO_CONFIG.url)
await client.connect()
const db = client.db(MONGO_CONFIG.dbName)
const collection = db.collection(MONGO_CONFIG.collectionName)
const filtro = {
  cart: { $elemMatch: { identifier: argv.identifier } }
}
const doc = await collection.findOne(filtro)
console.log(util.inspect(doc, { depth: 1 }))
await client.close()
