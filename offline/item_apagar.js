import rcdmongo from './rcdmongo.js'

const IDENTIFIER = ''
const { collection, client } = await rcdmongo()
const filtro = { 
  cart: { $elemMatch: { identifier: IDENTIFIER }}
}
const modificar = {
  $pull: { cart: { identifier: IDENTIFIER } }
}
await collection.updateOne(filtro, modificar)
await client.close()
