import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require('path')
console.log(path.resolve(__dirname, './src'))
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
  },
})
