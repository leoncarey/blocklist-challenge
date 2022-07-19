import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const pathResolve = (dir: string): string => resolve(__dirname, dir)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [{ find: '@/', replacement: pathResolve('src') + '/' }]
  },
  test: {
    include: ['./test/**/*.{test,spec}.ts'],
    exclude: [...configDefaults.exclude]
  }
})
