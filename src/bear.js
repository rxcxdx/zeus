import config from 'config'
import assert from 'node:assert/strict'
import { find, isEmpty, pick } from 'lodash-es'
import jsonfile from 'jsonfile'
import logger from './logger.js'

const file = config.get('zeus.userclientsPath')

function getUserclients() {
  return jsonfile.readFileSync(file)
}

function login(credentials) {
  assert(!isEmpty(credentials))
  const userclients = getUserclients()
  const doc = find(userclients, credentials)
  assert(doc)
  return pick(doc, ['name', 'access_token'])
}

function grant(formulario) {
  assert(!isEmpty(formulario))
  const userclients = getUserclients()
  const doc = find(userclients, formulario)
  assert(doc)
  logger.info('grant de ' + doc.name)  
}

export default {
  login,
  grant,
  getUserclients
}
