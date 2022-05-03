import * as fs from 'fs';
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import lessToJS from 'less-vars-to-js';
import { defineConfig } from 'vite';

const pathResolver = (path: string) => resolve(__dirname, path);
const themeVariables = lessToJS(
  fs.readFileSync(pathResolver('./src/antd-custom.less'), 'utf8')
);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    open: true,
    host: true,
  },
});
