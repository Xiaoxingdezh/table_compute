/*
 * @Author: FuXingyuan
 * @Date: 2023-09-15 13:58:27
 * @FilePath: \table_compute\vite.config.js
 * @LastEditors: FuXingyuan
 * @LastEditTime: 2023-09-19 22:19:47
 * @Server: 
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 配置别名
      "@": resolve(__dirname, "./src"),
      // "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
    }
  },
  server: {
    hmr: true,
    open: true, // 自动启动浏览器
    host: "0.0.0.0", // localhost
    port: 3006, // 端口号
    https: false,
    proxy: {
      // "^/api/": {
      //   //   // target: "http://localhost:9001/schedule", //后端服务实际地址
      //     target: "http://192.168.19.230:9000", //后端服务实际地址 殷铭泽
      //     changeOrigin: true, //开启代理
      //     rewrite: (path) => path.replace(/^\/api/, "")
      //   },
      "^/procurement/": {
        target: "http://192.168.19.212:9007", // 殷铭泽
        changeOrigin: true //开启代理
      }
    }
  },
  output: {
    publicPath: "./",
  }
})
