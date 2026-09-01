import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import {viteMockServe} from 'vite-plugin-mock'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: "sass" })]
    }),
    // viteMockServe({
    //   localEnabled: true, // 开发环境开启mock
    //   prodEnabled: false, // 生产关闭mock
    // }),
    mockDevServerPlugin({
      dir: 'mock', // mock 文件夹根目录
      log: 'info', // 控制台打印mock请求日志类型
      prefix: ['/mock'], // 只拦截匹配/mock开头的请求
      reload: false // 热更新时刷新页面
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // @use "@/styles/element/index.scss" as *;
        additionalData: `
        @use "@/styles/var.scss" as *;
        `,
      },
    },
  }
})
