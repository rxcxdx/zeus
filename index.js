import express from 'express'
import config from 'config'
import morgan from 'morgan'
import errorHandling from './src/errorHandling.js'
import logger from './src/logger.js'
import wsRouter from './src/wsRouter.js'
import owlRouter from './src/owlRouter.js'

const app = express()

app.use(express.json())

if (config.get('zeus.morgan.enable')) {
  app.use(
    morgan(config.get('zeus.morgan.format'), {
      immediate: config.get('zeus.morgan.immediate')
    })
  )
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
