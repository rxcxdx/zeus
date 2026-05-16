import express from 'express'
import config from 'config'
import morgan from 'morgan'
import logger from './src/logger.js'
import { errorHandling } from './src/error-handling.js'
import wsRouter from './src/wsRouter.js'
import owlRouter from './src/owlRouter.js'
const app = express()
app.use(express.json())
if (config.get('zeus.morgan.enable')) {
  app.use(morgan('tiny', { immediate: config.get('zeus.morgan.immediate') }))
}
app.use('/ws', wsRouter)
app.use('/ws/owl', owlRouter)
app.use((req, res) => {
  res.status(404).end()
})
app.use(errorHandling)
// só responde aqui http://localhost:8000/ws
app.listen(8000, 'localhost', () => {
  logger.info('zeus ON')
})
