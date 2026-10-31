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
            // В Docker на Windows изменения файлов видны только опросом. Опрашиваем раз в секунду,
            // а не 10 раз в секунду по умолчанию — иначе процессор загружен на 100%.
            watch:
                process.env.VITE_WATCH_POLLING === 'true'
                    ? {
                          usePolling: true,
                          interval: 1000,
                          binaryInterval: 3000,
                          ignored: ['**/node_modules/**', '**/dist/**'],
                      }
                    : undefined,
            // Локально сайт и API отвечают с одного адреса (http://localhost:3000), как на сервере:
            // запросы к /api, /m (фото) и /admin пересылаются в контейнер backend.
            proxy: process.env.VITE_PROXY_TARGET
                ? Object.fromEntries(
                      ['/api/', '/m/', '/admin/', '/s/'].map((path) => [
                          path,
                          { target: process.env.VITE_PROXY_TARGET, changeOrigin: true },
                      ])
                  )
                : undefined,
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
