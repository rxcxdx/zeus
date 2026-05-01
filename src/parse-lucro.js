import * as z from 'zod'

const schema = z.object({
  alpha: z.number().positive(),
  beta: z.number().min(0)
})

export function parseLucro(entrada) {
  const o = schema.parse(entrada)
  return o
}
