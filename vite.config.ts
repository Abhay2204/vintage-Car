import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        middlewareMode: false,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      },
      plugins: [
        react(),
        {
          name: 'configure-response-headers',
          configureServer: (server) => {
            server.middlewares.use('/', (req, res, next) => {
              if (req.url?.endsWith('.tsx') || req.url?.endsWith('.ts')) {
                res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
              }
              next();
            });
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        target: 'es2015',
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
          external: ['react', 'react-dom', '@google/genai', 'lucide-react', 'framer-motion', 'lenis'],
          output: {
            manualChunks: undefined,
            entryFileNames: 'assets/[name]-[hash].js',
            chunkFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]'
          }
        }
      }
    };
});
