import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    vue(
      {
        customElement: true
      }
    ),
    eslintPlugin(),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false
          },
          {
            name: 'cleanupIDs',
            active: true
          }
        ]
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "sass:math";
        @import "@/globalSCSS/index.scss";
      `
      }
    }
  },
  build: {
    minify: true,
    outDir: './lib_ce',
    lib: {
      entry: resolve(__dirname, './src/index_ce.js'),
      formats: ['es'],
      name: 'customElementsLib',
      fileName: (format) => `custom-elements-lib.${format}.js`
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': __dirname
    }
  }
})
