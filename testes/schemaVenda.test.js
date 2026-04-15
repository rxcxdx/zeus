import { schemaVenda } from '../src/schemas.js'

const dto = {
  username: 'zeca',
  cart: [
    {
      valor: 1,
      quantidade: 1,
      descricao: 'kuat',
    }
  ]
}

const { success } = schemaVenda.safeParse(dto)

test('schemaVenda', () => {  
  expect(success).toBeTruthy()
})
