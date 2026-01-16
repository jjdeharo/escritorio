import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(() => ({
    base: '/',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Escritorio Digital',
                short_name: 'Escritorio',
                description: 'Un escritorio digital interactivo con herramientas y widgets para el aula.',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                icons: [
                    {
                        src: 'escritorio-digital.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'escritorio-digital.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
        })
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('katex')) return 'katex';
                        if (id.includes('tiptap')) return 'tiptap';
                        if (id.includes('jspdf')) return 'jspdf';
                        if (id.includes('html2canvas')) return 'html2canvas';
                        if (id.includes('marked') || id.includes('turndown')) return 'markdown';
                        if (id.includes('react')) return 'react-vendor';
                        if (id.includes('@dnd-kit')) return 'dnd-kit';
                        return 'vendor';
                    }
                },
            },
        },
    },
}))
