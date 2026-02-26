import rcdmongo from './rcdmongo.js'
import { faker } from '@faker-js/faker'

const IDENTIFIER = '27de6035-ded3-4397-8ece-29aaaa4e583b'
const OBS = faker.lorem.word()
const { collection, client } = await rcdmongo()
const filtro = {
  cart: { $elemMatch: { identifier: IDENTIFIER }}
}
const modificar = {
  $set: { 'cart.$.obs': OBS }
}
await collection.updateOne(filtro, modificar)
await client.close()
