import { defineConfig } from "vite";

export default defineConfig({
    base: '',
    esbuild: {
        supported: {
            "top-level-await": true, //browsers can handle top-level-await features
        },
    },
    build: {
        emptyOutDir: false,
        minify: false,
        rollupOptions: {
            input: {
                service_worker: './src/sw/background.ts'
            },
            output: {
                entryFileNames: 'sw/background.js'
            }
        }
    },
});