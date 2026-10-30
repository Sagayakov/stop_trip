/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default ({ mode }) => {
    // Переменные окружения контейнера/системы важнее файла .env —
    // так docker-compose может задать адрес API для локального запуска.
    process.env = { ...loadEnv(mode, process.cwd()), ...process.env };
    const config = {
        plugins: [react(), EnvironmentPlugin('all')],
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
                entity: '/src/entity',
                features: '/src/features',
                pages: '/src/pages',
                shared: '/src/shared',
                widgets: '/src/widgets',
            },
        },
    };
    return defineConfig(config);
};
