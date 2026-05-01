import express from 'express'
import auth from 'basic-auth'
import flanker from './flanker.js'
import eagle from './eagle.js'
import bear from './bear.js'
import { parseLucro } from './parse-lucro.js'
import { calcMargemLucro } from './matematica.js'
import endPointItens from './endPointItens.js'
import endPointIndice from './endPointIndice.js'
import endPointRelatorio from './endPointRelatorio.js'
import endPointBuy from './endPointBuy.js'
import endPointGrafico from './endPointGrafico.js'

const router = express.Router()

router.get('/venda/:_id', (req, res, next) => {
  flanker
    .getVenda(req.params._id)
    .then((o) => res.send(o))
    .catch(next)
})

router.delete('/venda/:_id', (req, res, next) => {
  flanker
    .apagarVenda(req.params._id)
    .then(() => res.end())
    .catch(next)
})

router.get('/produtos', (req, res, next) => {
  eagle
    .getProdutos()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

router.put('/buy', (req, res, next) => {
  endPointBuy(req.body)
    .then(() => res.end())
    .catch(next)
})

router.get('/loja', (req, res, next) => {
  eagle
    .loja()
    .then((docs) => {
      res.send(docs)
    })
    .catch(next)
})

router.get('/itens', (req, res, next) => {
  endPointItens(req.query)
    .then((docs) => res.send(docs))
    .catch(next)
})

router.put('/produto', (req, res, next) => {
  eagle
    .upsertProduto(req.body)
    .then(() => res.end())
    .catch(next)
})

router.get('/produto/:id', (req, res, next) => {
  eagle
    .getProduto(req.params.id)
    .then((o) => {
      res.send(o)
    })
    .catch(next)
})

router.delete('/produto/:id', (req, res, next) => {
  eagle
    .apagarProduto(req.params.id)
    .then(() => res.end())
    .catch(next)
})

router.get('/timeline/vendas', (req, res, next) => {
  flanker
    .getTimelineVendas()
    .then((docs) => res.send(docs))
    .catch(next)
})

router.get('/timeline/itens', (req, res, next) => {
  flanker
    .getTimelineItens()
    .then((docs) => res.send(docs))
    .catch(next)
})

router.get('/login', (req, res) => {
  try {
    const credentials = auth(req)
    const o = bear.login(credentials)
    res.send(o)
  } catch {
    res.status(500).end()
  }
})

router.get(RegExp('/grant'), (req, res) => {
  try {
    bear.grant(req.query)
    res.status(200).end()
  } catch {
    res.status(401).end()
  }
})

router.get('/userclients', (req, res) => {
  const docs = bear.getUserclients()
  res.send(docs)
})

router.get('/relatorio', (req, res, next) => {
  endPointRelatorio(req.query)
    .then((doc) => res.send(doc))
    .catch(next)
})

router.get('/indice', (req, res, next) => {
  endPointIndice(req.query)
    .then((docs) => res.send(docs))
    .catch(next)
})

router.post('/lucro', (req, res) => {
  const formulario = parseLucro(req.body)
  const v = calcMargemLucro(formulario.alpha, formulario.beta).toFormat({ decimalSeparator: ',', suffix: ' %'})
  res.send(v)
})

router.get('/grafico/:isoMonth', (req, res, next) => {
  endPointGrafico(req.params.isoMonth)
    .then((docs) => res.send(docs))
    .catch(next)
})

router.put('/editar/venda', (req, res, next) => {
  flanker
    .editarVenda(req.body)
    .then((o) => res.send(o))
    .catch(next)
})

router.put('/editar/item', (req, res, next) => {
  flanker
    .editarItem(req.body)
    .then((o) => res.send(o))
    .catch(next)
})

export default router
