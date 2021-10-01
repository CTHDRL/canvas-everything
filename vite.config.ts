import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './src/canvas-everything/index.ts',
            name: 'canvas-everything',
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                }
            }
        }
    }
})
