import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    crx({
      manifest: {
        manifest_version: 3,
        name: 'Chatham',
        version: '1.0.0',
        description: 'Privacy-first project management with E2E encryption',

        side_panel: {
          default_path: 'sidepanel.html'
        },

        action: {
          default_title: 'Open Chatham'
        },

        permissions: ['storage', 'sidePanel']
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      input: {
        sidepanel: path.resolve(__dirname, 'sidepanel.html'),
        fullpage: path.resolve(__dirname, 'fullpage.html')
      }
    }
  }
})
