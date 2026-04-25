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
  try {
    const userclients = getUserclients()
    const doc = find(userclients, credentials)
    assert(doc, 'não encontrou userclient')
    return pick(doc, ['name', 'access_token'])
  } catch (error) {
    logger.error('erro no login:' + error.message)
    throw error
  }
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
