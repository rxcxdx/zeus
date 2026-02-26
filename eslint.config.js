import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'

export default defineConfig([
  {
    languageOptions: { globals: { ...globals.node, ...globals.jest } }
  },
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn'
    }
  }
])
