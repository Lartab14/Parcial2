
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Actualiza el Service Worker automáticamente cuando hay cambios
      manifest: {
        name: 'Futurama',
        short_name: 'MiApp',
        description: 'Una aplicación React convertida en PWA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', // Hace que la app se comporte como una app nativa
        start_url: '/',
        icons: [
          {
            src: 'icons/bender512.jpg',
            sizes: '512x512',
            type: 'image/jpg',
          },
          {
            src: 'icons/bender128.jpg',
            sizes: '128x128',
            type: 'image/jpg',
          },
        ],
      },
      workbox: {
        // Define qué archivos se cachean para que la app funcione offline
        globPatterns: ['*/.{js,css,html,svg,png}'],
      },
    }),
  ],
});