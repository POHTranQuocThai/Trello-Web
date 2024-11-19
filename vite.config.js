import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svg from '@rollup/plugin-svg'

// https://vitejs.dev/config/
export default defineConfig({
  //Cho phép thằng vite sử dụng process.env
  define: {
    'process.env': process.env
  },
  plugins: [
    react(),
    svg({
      svgrOptions: {
        icon: true, // Chuyển đổi SVG thành biểu tượng
        exportAsDefault: true
      }
    })
  ],
  // base: './'
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
