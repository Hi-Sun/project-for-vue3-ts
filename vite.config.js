import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    base: './',
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          additionalData:  '@import "./src/styles/variable.scss";'
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      // proxy: {
      //   '/api/workflows': {
      //     target: 'http://10.253.28.47:8888',
      //     changeOrigin: true,
      //     // rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      //   '/api': {
      //     target: 'http://10.192.17.135:8888',
      //     changeOrigin: true,
      //     // rewrite: (path) => path.replace(/^\/api/, ''),
      //     // bypass(req, res, options) {
      //     //   const realUrl = options.target + (options.rewrite ? options.rewrite(req.url) : '');
      //     //   console.log(realUrl); // 在终端显示
      //     //   res.setHeader('A-Real-Url', realUrl); // 添加响应标头(A-Real-Url为自定义命名)，在浏览器中显示
      //     // },
      //   },
      // }
    },
  })
}
