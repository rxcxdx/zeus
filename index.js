import config from 'config'
import express from 'express'
import morgan from 'morgan'
import auth from 'basic-auth'
import assert from 'node:assert/strict'
import errorHandling from './src/errorHandling.js'
import { logger } from './src/logger.js'
import { calcMargemLucro } from './src/matematica.js'
import eagle from './src/eagle.js'
import flanker from './src/flanker.js'
import bear from './src/bear.js'
import {
  endPointBuy,
  endPointItens,
  endPointVenda,
  endPointIndice,
  endPointRelatorio,
  endPointGrafico
} from './src/endpoint.js'
import { assertIsoDate, assertIsoMonth } from './src/utils.js'
import { schemaProdutoUpsert, schemaMargemLucro } from './src/schemas.js'

const app = express()

app.use(express.json())

const isMorgan = config.get('isMorgan')

if (isMorgan) {
  app.use(morgan('tiny', { immediate: true }))
}

app.get('/ws/configuracao', (req, res) => {
  res.send({
    config,
    NODE_ENV: process.env.NODE_ENV
  })
})

app.post('/ws/lucro', (req, res) => {
  const formulario = schemaMargemLucro.parse(req.body)
  const o = calcMargemLucro(formulario.alpha, formulario.beta)
  res.send(o)
})

app.put('/ws/produto', (req, res, next) => {
  const o = schemaProdutoUpsert.parse(req.body)
  eagle
    .upsertProduto(o)
    .then(() => res.end())
    .catch(next)
})

app.post('/ws/buy', (req, res, next) => {
  endPointBuy(req.body)
    .then((doc) => res.send(doc))
    .catch(next)
})

app.get('/ws/produtos', (req, res, next) => {
  eagle
    .getProdutos()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/produto/:id', (req, res, next) => {
  eagle
    .getProduto(req.params.id)
    .then((o) => {
      res.send(o)
    })
    .catch(next)
})

app.delete('/ws/produto', (req, res, next) => {
  eagle
    .apagarProduto(req.query.id)
    .then(() => res.end())
    .catch(next)
})

app.delete('/ws/venda/:_id', (req, res, next) => {
  flanker
    .apagarVenda(req.params._id)
    .then(() => res.end())
    .catch(next)
})

app.get('/ws/login', (req, res) => {
  const credentials = auth(req)
  assert(credentials, 'credencial inválida')
  const o = bear.login(credentials)
  res.send(o)
})

app.post('/ws/relatorio', (req, res, next) => {
  endPointRelatorio(req.body)
    .then((doc) => res.send(doc))
    .catch(next)
})

app.post('/ws/indice', (req, res, next) => {
  endPointIndice(req.body)
    .then((docs) => res.send(docs))
    .catch(next)
})

app.get('/ws/grafico/:isoMonth', (req, res, next) => {
  assertIsoMonth(req.params.isoMonth)
  endPointGrafico(req.params.isoMonth)
    .then((docs) => res.send(docs))
    .catch(next)
})

app.get('/ws/itens/:isoDate', (req, res, next) => {
  assertIsoDate(req.params.isoDate)
  endPointItens(req.params.isoDate)
    .then((docs) => res.send(docs))
    .catch(next)
})

app.get('/ws/venda/:_id', (req, res, next) => {
  endPointVenda(req.params._id)
    .then((o) => res.send(o))
    .catch(next)
})

app.get('/ws/timeline', (req, res, next) => {
  flanker
    .getTimeline()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.get('/ws/loja', (req, res, next) => {
  eagle
    .loja()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

app.use((req, res) => {
  res.status(404).end()
})

app.use(errorHandling)

const PORT = 8000
const HOSTNAME = 'localhost'
app.listen(PORT, HOSTNAME, () => {
  logger.info('ws ON')
})
