import { defineConfig } from "vite";

export default defineConfig({
    base: '',
    esbuild: {
        supported: {
            "top-level-await": true, //browsers can handle top-level-await features
        },
    },

    plugins: [
    ],
    build: {
        emptyOutDir: false,
    },
});