import * as z from 'zod'

const schemaItem = z.object({
  identifier: z.nanoid(),
  descricao: z.string(),
  quantidade: z.int().positive(),
  valor: z.number().positive(),
  obs: z.string().trim().toLowerCase()
})

export const schemaVenda = z.object({
  username: z.string(),
  cart: z.array(schemaItem).min(1),
  obs: z.string().trim().toLowerCase()
})

export const schemaProdutoUpsert = z.object({
  id: z.uuidv4().optional(),
  descricao: z.string().min(1),
  valor: z.number().positive()
})

export const schemaMargemLucro = z.object({
  alpha: z.number().positive(),
  beta: z.number().positive(),
})
