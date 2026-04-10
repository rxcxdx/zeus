import * as z from 'zod'
import { nanoid } from 'nanoid'

const schemaItem = z.object({
  identifier: z.nanoid(),
  valor: z.number().positive(),
  quantidade: z.int().positive(),
  descricao: z.string().lowercase(),
  obs: z.string().lowercase()
})

export const schemaVenda = z.object({
  username: z.string().lowercase(),
  cart: z.array(schemaItem).min(1),
  obs: z.string().trim().lowercase()
})

export const schemaProdutoUpsert = z.object({
  id: z.nanoid().default(() => nanoid()),
  descricao: z.string().min(1).lowercase(),
  valor: z.number().positive(),
  categoria: z.object({ id: z.string() }).nullable()
})

export const schemaMargemLucro = z.object({
  alpha: z.number().positive(),
  beta: z.number().min(0)
})

export const schemaIndice = z.object({
  gte: z.iso.date(),
  lte: z.iso.date()
})

export const schemaRelatorio = z.object({
  gte: z.iso.date(),
  lte: z.iso.date()
})

export const schemaEditarDt = z.object({
  _id: z.string(),
  dt: z.iso.datetime({ offset: true }).pipe(z.coerce.date())
})

export const schemaItens = z.object({
  dia: z.iso.date(),
  descricao: z.string().trim().optional()
})
