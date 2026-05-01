import { parseVenda } from '../src/parse-venda.js'

const mock = {
  username: 'zeca',
  cart: [
    {
      valor: 10,
      quantidade: 1,
      descricao: 'kuat'
    },
    {
      valor: 10.12,
      quantidade: 1,
      descricao: 'ovo'
    }
  ]
}

const resposta = parseVenda(mock)

test('parseVenda', () => {
  expect(resposta.total).toBe(20.12)
})
