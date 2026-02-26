import rcdmongo from './rcdmongo.js'

const { db, client } = await rcdmongo()
const stats = await db.stats()
await client.close()
console.log(stats)

