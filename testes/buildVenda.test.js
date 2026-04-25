import {buildVenda} from '../src/buildVenda.js'

const mock = {
  username: 'zeca',
  cart: [
    {
      valor: 10,
      quantidade: 1,
      descricao: 'kuat',
    },
    {
      valor: 10.12,
      quantidade: 1,
      descricao: 'ovo',
    }
  ]
}

const resposta = buildVenda(mock)

test('buildVenda', () => {
  expect(resposta.itens).toBe(2)
  expect(resposta.total).toBe(20.12)
})