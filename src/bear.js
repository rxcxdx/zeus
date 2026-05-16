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
    const filtro = {
      username: credentials.name,
      senha: credentials.pass
    }
    const doc = find(userclients, filtro)
    assert(doc, 'não encontrou userclient')
    return pick(doc, ['username', 'access_token'])
  } catch (error) {
    logger.error('erro no login:' + error.message)
    throw error
  }
}

// imporove
function grant(formulario) {
  assert(!isEmpty(formulario))
  const userclients = getUserclients()
  const filtro = {
    username: formulario.username,
    access_token: formulario.access_token
  }
  const doc = find(userclients, filtro)
  assert(doc)
  logger.info('grant de ' + doc.username)
}

export default {
  login,
  grant,
  getUserclients
}
