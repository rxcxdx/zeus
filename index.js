import express from 'express'
import config from 'config'
import morgan from 'morgan'
import logger from './src/logger.js'
import errorHandling from './src/errorHandling.js'
import wsRouter from './src/wsRouter.js'
import owlRouter from './src/owlRouter.js'

const app = express()
app.use(express.json())
const MORGAN_CONFIG = config.util.toObject(config.get('zeus.morgan'))
if (MORGAN_CONFIG.enable) {
  app.use(morgan(MORGAN_CONFIG.format, { immediate: MORGAN_CONFIG.immediate }))
}
app.use('/ws', wsRouter)
app.use('/ws/owl', owlRouter)
app.use((req, res) => {
  res.status(404).end()
})
app.use(errorHandling)
app.listen(8000, 'localhost', () => {
  logger.info('zeus ON')
})
