import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  test: {
    globals: true,       // lets you use describe/it/expect without importing them
    environment: "jsdom", // fake browser DOM for components
    setupFiles: "./src/test/setup.ts",
  },
})
