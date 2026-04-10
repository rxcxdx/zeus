import config from 'config'
import assert from 'node:assert/strict'
import { find, pick } from 'lodash-es'
import jsonfile from 'jsonfile'
import logger from './logger.js'

const file = config.get('zeus.userclientsPath')

function buscarUserclients() {
  return jsonfile.readFileSync(file)
}

function login(credentials) {
  const userclients = buscarUserclients()
  const doc = find(userclients, {
    username: credentials.name,
    password: credentials.pass
  })
  assert(doc, 'As informações de login que você inseriu estão incorretas')
  return pick(doc, ['username', 'access_token'])
}

function grant(formulario) {
  const userclients = buscarUserclients()
  const doc = find(userclients, {
    username: formulario.username,
    access_token: formulario.access_token
  })
  assert(doc)
  logger.info('grant de ' + doc.username)
}

export default {
  login,
  grant
}
