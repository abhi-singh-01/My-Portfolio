import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh for faster development
      fastRefresh: true,
    }),
    tailwindcss(),
  ],

  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'react-icons'],
  },

  build: {
    // Enable minification
    minify: 'esbuild',

    // Target modern browsers for smaller bundles
    target: 'es2020',

    // Enable CSS code splitting
    cssCodeSplit: true,

    // Optimize chunk size
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Vendor chunk for React
          'react-vendor': ['react', 'react-dom'],
          // Animation libraries
          'animation': ['framer-motion'],
          // Icons (large bundle, load separately)
          'icons': ['react-icons'],
        },
      },
    },

    // Enable source maps for debugging
    sourcemap: false,
  },

  // Faster dev server
  server: {
    hmr: true,
  },
})
