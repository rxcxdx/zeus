import rcdmongo from './rcdmongo.js'
import dayjs from 'dayjs'

const { collection, client } = await rcdmongo()
const filtro = {
    dt: {
      $gte: dayjs().startOf('day').toDate(),
      $lte: dayjs().endOf('day').toDate()
    }
  }
await collection.deleteMany(filtro)
await client.close()