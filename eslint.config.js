import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'

export default defineConfig([
  {
    languageOptions: { globals: { ...globals.node, ...globals.jasmine } }
  },
  js.configs.recommended
])
