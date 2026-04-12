import config from 'config'
import { createLogger, transports, format } from 'winston'

export default createLogger({
  level: config.get('zeus.logger.level'),
  transports: [
    new transports.Console({
      format: format.cli(),
      silent: config.get('zeus.logger.silentConsole')
    }),
    new transports.File({
      filename: config.get('zeus.logger.filename'),
      format: format.combine(format.timestamp(), format.json()),
      silent: config.get('zeus.logger.silentFile')
    })
  ]
})
