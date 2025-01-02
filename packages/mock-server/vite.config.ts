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
        rollupOptions: {
            input: {
                server: './src/server.ts'
            },
            output: {
                entryFileNames: 'server.mjs'
            }
        }
    },
});