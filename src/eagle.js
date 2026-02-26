import { Sequelize, DataTypes } from 'sequelize'
import config from 'config'
import assert from 'node:assert/strict'
import { rcdebug } from './utils.js'

const STORAGE = config.get('eagle')

const CONFIG_GLOBAL = {
  freezeTableName: true
}

function conversor(modelos) {
  return modelos.map((o) => o.toJSON())
}

const sequeConexao = new Sequelize({
  dialect: 'sqlite',
  storage: STORAGE,
  logging: undefined,
  define: CONFIG_GLOBAL
})

const Produto = sequeConexao.define('produtos', {
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

async function upsertProduto(o) {
  rcdebug(o, 1)

  await Produto.upsert(o)
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

async function associarCategoria(produtoId, categoriaId) {
  const modelo = await Produto.findByPk(produtoId)
  await modelo.setCategoria(categoriaId)
}

async function inserirCategorias() {
  await Categoria.upsert({
    id: '5363c388-b55c-479e-a01d-99e519a7ace1',
    descricao: 'verde '
  })
  await Categoria.upsert({
    id: 'f67b7da9-46f8-45a9-be20-50a5eb154733',
    descricao: 'amarelo '
  })
}

export default {
  upsertProduto,
  getProduto,
  getProdutos,
  loja,
  apagarProduto,
  sincronizar,
  associarCategoria,
  inserirCategorias
}
