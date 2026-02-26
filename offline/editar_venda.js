import rcdmongo from './rcdmongo.js'
import { faker } from '@faker-js/faker'

const _ID = 'PttStcZnq_XzwjkLqMy0r'
const OBS = faker.lorem.word()
const { collection, client } = await rcdmongo()
const filtro = {
  _id: _ID
}
const modificar = {
  $set: {
    obs: OBS,
    dt: new Date('2026-02-01T12:22:44.000Z')
  }
}
await collection.updateOne(filtro, modificar)
await client.close()
