import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.js',
            ssr: 'resources/js/ssr.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        visualizer({
            filename: './storage/analyzer/bundle-analyzer.html',
            open: true,
            template: 'list', //sunburst, treemap, network, json, list
            json: false,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
});
