/*eslint no-unused-vars: 'off'*/

import * as z from 'zod'
import { pt } from 'zod/locales'

z.config(pt())

function getErrorMessage(error) {
  if (error instanceof z.ZodError) return z.prettifyError(error)
  return error.message
}

export default function errorHandling(error, req, res, next) {
  const message = getErrorMessage(error)
  return res.status(500).send({
    local: 'errorHandling',
    motivo: message,
    tipo: error.name
  })
  
}
