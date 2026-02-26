import rcdmongo from './rcdmongo.js'
import util from 'util'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .demandOption('identifier')
  .string('identifier')
  .parse()
const { collection, client } = await rcdmongo()
const filtro = {
  cart: { $elemMatch: { identifier: argv.identifier }}
}
const doc = await collection.findOne(filtro)
await client.close()
console.log(util.inspect(doc, { depth: 0 }))


