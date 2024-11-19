import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteSvgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  //Cho phép thằng vite sử dụng process.env
  define: {
    'process.env': process.env
  },
  plugins: [
    react(),
    viteSvgr({
      svgrOptions: {
        icon: true // Chuyển đổi SVG thành biểu tượng
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
