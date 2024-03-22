import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { viteMockServe } from 'vite-plugin-mock';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    // viteMockServe({
    //   // Proxy configuration
    //   proxy: {
    //     '/api': {
    //       target: 'http://localhost:5000',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, '')
    //     }
    //   }
    // })
  ],
})
