import rcdmongo from './rcdmongo.js'
import { every,shuffle } from 'lodash-es'
import check from 'check-types'

// every não executa tudo

const { collection, client } = await rcdmongo()
const vendas = await collection.find({}).toArray()
await client.close()
const flag = every(shuffle(vendas), (o) => {
  return check.date(o.dt)
})
console.log('Lista de vendas é válida?', flag)
