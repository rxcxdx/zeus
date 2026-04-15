import { confirm } from '@inquirer/prompts'
import eagle from '../src/eagle.js'

const answer = await confirm({ message: 'Continue?', default: false })

if (answer) {
  await eagle.sincronizar()
  await eagle.inserirCategorias()
}
