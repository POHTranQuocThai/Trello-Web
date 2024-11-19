import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // Optimize SVG output
        icon: true,
        // Make SVG fill-able from parent color
        expandProps: true,
        // Generate a default export
        exportType: 'default',
        // Output SVG in jsx ready format
        jsx: {
          babelConfig: {
            plugins: [
              '@svgr/plugin-jsx'
            ]
          }
        },
        // Clean and optimize SVG output
        svgo: true
      },
      include: '**/*.svg'
    })
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  // Ensure assets are properly handled
  assetsInclude: ['**/*.svg'],
  // Optimization for build
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Add other common dependencies here
        }
      }
    }
  }
})