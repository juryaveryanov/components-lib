import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import createSvgSpritePlugin from 'vite-plugin-svg-sprite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({cache:false}),
    createSvgSpritePlugin({
      symbolId: 'icon-[name]-[hash]',
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:  `
        @use "sass:math";
        @import "@/globalSCSS/index.scss";
      `,
      }
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, '@/index.js'),
      name: 'a-components',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': __dirname
    },
  }
})
