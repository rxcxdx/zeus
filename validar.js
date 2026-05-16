import fs from 'fs'
import assert from 'node:assert/strict'

const arquivos = ['eslint.config.js', 'prettier.config.js']

arquivos.forEach((v) => {
  assert(fs.existsSync(v))
})
