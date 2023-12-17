/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const config = {
        plugins: [react()],
        server: {
            host: true,
            port: 3000,
            proxy: {
                '/api': {
                    target: process.env.VITE_BASE_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        resolve: {
            alias: {
                app: '/src/app',
                entities: '/src/entities',
                features: '/src/features',
                pages: '/src/pages',
                shared: '/src/shared',
                widgets: '/src/widgets',
            },
        },
    };
    return defineConfig(config);
};
