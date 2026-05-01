import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid';

const schema = z.object({
    id: z.string().default(() => uuidv4()),
    descricao: z.string().min(1),
    valor: z.number().positive(),
    categoriaId: z.string().nullable()
})

export function parseProduto(entrada) {
    const o = schema.parse(entrada)
    return o
}
