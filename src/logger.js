import config from 'config'
import { createLogger, transports, format } from 'winston'

const LOGGER_CONFIG = config.util.toObject(config.get('zeus.logger'))

export default createLogger({
  level: LOGGER_CONFIG.level,
  transports: [
    new transports.Console({
      format: format.cli(),
      silent: LOGGER_CONFIG.silentConsole
    }),
    new transports.File({
      filename: LOGGER_CONFIG.filename,
      format: format.combine(format.timestamp(), format.json()),
      silent: LOGGER_CONFIG.silentFile
    })
  ]
})
