import * as z from 'zod'
import { nanoid } from 'nanoid'

// z.uuidv4()
// z.nanoid()
// z.iso.datetime({ offset: true }).pipe(z.coerce.date())

const schemaItem = z.object({
  identifier: z.nanoid(),
  valor: z.number().positive(),
  quantidade: z.int().positive(),
  descricao: z.string(),
  obs: z.string().trim()
})

export const schemaVenda = z.object({
  username: z.string(),
  cart: z.array(schemaItem).min(1),
  obs: z.string().trim()
})

export const schemaProdutoUpsert = z.object({
  id: z.string().default(() => nanoid()),
  descricao: z.string().min(1),
  valor: z.number().positive(),
  categoria: z.object({ id: z.string() }).nullable()
})

export const schemaMargemLucro = z.object({
  alpha: z.number().positive(),
  beta: z.number().min(0)
})
