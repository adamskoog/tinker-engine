import { defineConfig } from 'vite';
import path from 'path';

// import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
        server: {
            port: 3000
        },
        preview: {
            port: 3000
        },
        build: {
            outDir: 'build'
        },
        // plugins: [
        //     react(),
        // ]
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@data': path.resolve(__dirname, './src/data'),
                '@helpers': path.resolve(__dirname, './src/helpers'),
                '@objects': path.resolve(__dirname, './src/objects')
            }
        }
    }
});