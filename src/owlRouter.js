import express from 'express'
import config from 'config'
import getZone from './getZone.js'
import { defaultTo } from 'lodash-es'

const router = express.Router()

router.get('/env', (req, res) => {
  res.send({
    NODE_ENV: defaultTo(process.env.NODE_ENV, null),
    TZ: defaultTo(process.env.TZ, null),
    NODE_CONFIG_DIR: defaultTo(process.env.NODE_CONFIG_DIR, null)
  })
})

router.get('/zone', (req, res) => {
  res.send(getZone())
})

router.get('/config', (req, res) => {
  res.send(config.util.toObject(config))
})

export default router
