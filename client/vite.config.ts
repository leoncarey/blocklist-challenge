import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

const pathResolve = (dir: string): string => resolve(__dirname, dir)

const includeTest = [
  // './src/**/*.{vue,ts}',
  './test/**/*.{test,spec}.ts',
]

export default defineConfig({
  plugins: [
    // vue({
    //   template: {
    //     compilerOptions: {
    //       isCustomElement: (element: any) => {
    //         return element.contains('el')
    //       },
    //     },
    //   },
    // }),
    vue(),
    tsconfigPaths(),
  ],
  publicDir: 'public',
  resolve: {
    alias: [{ find: '@/', replacement: pathResolve('src') + '/' }],
  },
  test: {
    include: includeTest,
    exclude: [...configDefaults.exclude, './src/main.ts', './src/**/*.d.ts'],
    environment: 'happy-dom',
    watch: false,
    globals: true,
  },
  server: {
    host: true,
    port: 5173,
  },
})
