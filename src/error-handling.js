import * as z from 'zod'
import { pt } from 'zod/locales'

z.config(pt())

function removerIcones(v) {
  const regex = new RegExp('✖|→', 'g')
  return v.replace(regex, '')
}

function removerNovaLinha(v) {
  return v.replaceAll('\n', '')
}

function trim(v) {
  const regex = new RegExp('\\s+', 'g')
  return v.replace(regex, ' ').trim()
}

function getErrorZod(error) {
  let v = z.prettifyError(error)
  v = removerIcones(v)
  v = removerNovaLinha(v)
  v = trim(v)
  return v
}
function getErrorMessage(error) {
  if (error instanceof z.ZodError) return getErrorZod(error)
  return error.message
}

// eslint-disable-next-line
export function errorHandling(error, req, res, next) {
  const message = getErrorMessage(error)
  return res.status(500).send({
    motivo: message,
    tipo: error.name
  })
}
