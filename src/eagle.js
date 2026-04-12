import config from 'config'
import assert from 'node:assert/strict'
import { Sequelize, DataTypes } from 'sequelize'
import { get } from 'lodash-es'
import { schemaProdutoUpsert } from './schemas.js'
import { assertDecimalPlaces } from './utils.js'

const CONFIG_GLOBAL = {
  freezeTableName: true
}

function conversor(modelos) {
  return modelos.map((o) => o.toJSON())
}

const sequeConexao = new Sequelize({
  dialect: 'sqlite',
  storage: config.get('zeus.eaglePath'),
  logging: undefined,
  define: CONFIG_GLOBAL
})

const Produto = sequeConexao.define('produtos', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  valor: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
})

const Categoria = sequeConexao.define(
  'categorias',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  },
  { timestamps: false }
)

Produto.belongsTo(Categoria, { onDelete: 'RESTRICT' })

async function upsertProduto(entrada) {
  const o = schemaProdutoUpsert.parse(entrada)
  assertDecimalPlaces(o.valor)
  await Produto.upsert({ ...o, categoriaId: get(o, 'categoria.id') })
}

async function getProduto(id) {
  const modelo = await Produto.findByPk(id, {
    attributes: ['id', 'descricao', 'valor'],
    rejectOnEmpty: true,
    include: { all: true }
  })
  return modelo.toJSON()
}

async function getProdutos() {
  const modelos = await Produto.findAll({
    attributes: ['id', 'descricao']
  })
  const rs = conversor(modelos)
  rs.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return rs
}

async function loja() {
  const modelos = await Produto.findAll({
    attributes: ['id', 'descricao', 'valor']
  })
  const rs = conversor(modelos)
  rs.sort((a, b) => a.descricao.localeCompare(b.descricao))
  return rs
}

async function apagarProduto(id) {
  const destroyed = await Produto.destroy({ where: { id } })
  assert(destroyed, 'nada foi apagado')
}

async function sincronizar() {
  await sequeConexao.sync({ force: true })
}

async function inserirCategorias() {
  await Categoria.upsert({ descricao: 'verde' })
  await Categoria.upsert({ descricao: 'amarelo' })
}

export default {
  upsertProduto,
  getProduto,
  getProdutos,
  loja,
  apagarProduto,
  sincronizar,
  inserirCategorias
}
