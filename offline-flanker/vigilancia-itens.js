import config from 'config'
import { MongoClient } from 'mongodb'
import check from 'check-types'
import { shuffle, flatMap } from 'lodash-es'

const client = new MongoClient(config.get('zeus.mongo.url'))
await client.connect()
const db = client.db(config.get('zeus.mongo.dbName'))
const collection = db.collection(config.get('zeus.mongo.collectionName'))
const registros = await collection.find({}).toArray()
await client.close()
let cart = flatMap(registros, 'cart')
cart = shuffle(cart)
try {
  cart.forEach((o) => {
    const msgErro = 'item errado:' + o.identifier
    check.assert.number(o.subtotal, msgErro)
  })
  console.log('lista de itens é válida!')
} catch (error) {
  console.log('lista de itens inválida!')
  console.log(error.message)
}
