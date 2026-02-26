import rcdmongo from './rcdmongo.js'
import util from 'util'

const { collection, client } = await rcdmongo()
const doc = await collection.findOne({}, { sort: [['dt', -1]] })
await client.close()
console.log(util.inspect(doc, { depth: 0 }))

