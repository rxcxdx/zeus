import { createLogger, transports, format } from 'winston'
import config from 'config'

const FILENAME = config.get('logConfig.filename')
const LEVEL = config.get('logConfig.level')
const SILENT = config.get('logConfig.silent')

/*
  error: 0
  warn: 1
  info: 2
  http: 3
  verbose: 4
  debug: 5
  silly: 6
*/

// Se o arquivo não existe é criado
// Reiniciar o servidor não apaga o arquivo

const tipo01 = new transports.File({
  filename: FILENAME,
  format: format.combine(format.timestamp(),format.json())
})

const tipo02 = new transports.Console({
  format: format.cli()
})

const joker = process.env.NODE_ENV === 'production' ? tipo01 : tipo02

export const logger = createLogger({
  level: LEVEL,
  transports: joker,
  silent: SILENT,
  format: format.errors(),
})
