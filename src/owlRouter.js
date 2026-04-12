import express from 'express'
import config from 'config'
import flanker from './flanker.js'
import getAtual from './getAtual.js'

const router = express.Router()

router.get('/env', (req, res) => {
  res.send({
    NODE_ENV: process.env.NODE_ENV,
    TZ: process.env.TZ,
    NODE_CONFIG_DIR: process.env.NODE_CONFIG_DIR
  })
})

router.get('/atual', (req, res) => {
  res.send(getAtual())
})

router.get('/config', (req, res) => {  
  res.send(config.util.toObject(config))
})

router.get('/stats', (req, res, next) => {
  flanker
    .getStats()
    .then((o) => res.send(o))
    .catch(next)
})

export default router
