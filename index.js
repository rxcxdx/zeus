import config from 'config'
import express from 'express'
import morgan from 'morgan'
import auth from 'basic-auth'
import errorHandling from './src/errorHandling.js'
import logger from './src/logger.js'
import { calcMargemLucro } from './src/matematica.js'
import eagle from './src/eagle.js'
import flanker from './src/flanker.js'
import bear from './src/bear.js'
import getAtual from './src/getAtual.js'
import {
  endPointBuy,
  endPointItens,
  endPointIndice,
  endPointRelatorio,
  endPointGrafico
} from './src/endpoint.js'
import {
  schemaProdutoUpsert,
  schemaMargemLucro,
  schemaEditarDt
} from './src/schemas.js'

const app = express()

app.use(express.json())

if (config.get('zeus.isMorgan')) {
  app.use(morgan('tiny', { immediate: true }))
}

app.get('/ws/atual', (req, res) => {
  res.send(getAtual())
})

app.get('/ws/env', (req, res) => {
  res.send({
    NODE_ENV: process.env.NODE_ENV,
    TZ: process.env.TZ,
    NODE_CONFIG_DIR: process.env.NODE_CONFIG_DIR
  })
})

app.get('/ws/config', (req, res) => {
  res.send(config)
})

app.get('/ws/stats', (req, res, next) => {
  flanker
    .getStats()
    .then((o) => res.send(o))
    .catch(next)
})

app.post('/ws/lucro', (req, res) => {
  const formulario = schemaMargemLucro.parse(req.body)
  const v = calcMargemLucro(formulario.alpha, formulario.beta)
  res.send(v)
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
    .then(() => res.end())
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

app.delete('/ws/produto/:id', (req, res, next) => {
  eagle
    .apagarProduto(req.params.id)
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
  const o = bear.login(credentials)
  res.send(o)
})

app.get(RegExp('/ws/grant'), (req, res) => {
  try {
    bear.grant(req.query)
    res.status(200).end()
  } catch {
    res.status(401).end()
  }
})

app.get('/ws/relatorio', (req, res, next) => {
  endPointRelatorio(req.query)
    .then((doc) => res.send(doc))
    .catch(next)
})

app.get('/ws/indice', (req, res, next) => {
  endPointIndice(req.query)
    .then((docs) => res.send(docs))
    .catch(next)
})

app.post('/ws/editar/dt', (req, res, next) => {
  const formulario = schemaEditarDt.parse(req.body)
  flanker
    .editarDt(formulario)
    .then(() => res.end())
    .catch(next)
})

app.get('/ws/grafico/:isoMonth', (req, res, next) => {
  endPointGrafico(req.params.isoMonth)
    .then((docs) => res.send(docs))
    .catch(next)
})

app.post('/ws/itens', (req, res, next) => {
  endPointItens(req.body)
    .then((docs) => res.send(docs))
    .catch(next)
})

app.get('/ws/venda/:_id', (req, res, next) => {
  flanker
    .getVenda(req.params._id)
    .then((o) => res.send(o))
    .catch(next)
})

app.get('/ws/timeline/vendas', (req, res, next) => {
  flanker
    .getTimelineVendas()
    .then((docs) => res.send(docs))
    .catch(next)
})

app.get('/ws/timeline/itens', (req, res, next) => {
  flanker
    .getTimelineItens()
    .then((docs) => res.send(docs))
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

app.listen(8000, 'localhost', () => {
  logger.info('zeus ON')
})
