import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

const pathResolve = (dir: string): string => resolve(__dirname, dir)

export default defineConfig({
  plugins: [vue(), tsconfigPaths()],
  publicDir: 'public',
  resolve: {
    alias: [{ find: '@/', replacement: pathResolve('src') + '/' }],
  },
  test: {
    include: ['./test/**/*.{test,spec}.ts'],
    exclude: [...configDefaults.exclude],
    environment: 'happy-dom',
    watch: false,
  },
  server: {
    host: true,
    port: 5173,
  },
})
