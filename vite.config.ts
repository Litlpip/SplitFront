import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'safari-pinned-tab.svg',
      ],
      manifest: {
        name: 'VibeSplit - Честное деление расходов',
        short_name: 'VibeSplit',
        description:
          'Приложение для разделения совместных расходов между друзьями',
        theme_color: '#1B5E20',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        categories: ['finance', 'productivity', 'social'],
        lang: 'ru',
        icons: [
          {
            src: '/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24, // 24 часа
                maxEntries: 100,
              },
              networkTimeoutSeconds: 10,
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 дней
                maxEntries: 60,
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@chakra-ui/react'],
          utils: ['@tanstack/react-query', 'axios'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
