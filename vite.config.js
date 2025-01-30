import path, { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'


const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/ImageResize.js'),
      name: 'ImageResize',
      fileName: 'quill-image-resize-module',
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
  },
})
