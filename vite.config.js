import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    autoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],

  //代理解决跨域问题
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8099',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 组件路径别名,语法：别名：resolve(__dirname,'组件原路径')
      // eslint-disable-next-line no-undef
      com: resolve(__dirname, 'src/component')
      //静态资源路径别名
    }
  },

  build: {
    // 设置打包的入口文件
    rollupOptions: {
      input: 'index.html'
    },
    // 设置打包后的文件名
    outDir: 'dist',
    // 设置打包后的资源公共路径
    assetsDir: 'assets',
    // 设置是否生成sourcemap
    sourcemap: false,
    // 设置是否压缩打包后的文件
    // 设置是否为打包后的文件生成gzip压缩版本
    brotliSize: true,
    // 设置chunk大小警告的水平
    chunkSizeWarningLimit: 2000
  }
})
