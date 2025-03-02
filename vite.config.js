import process from 'process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

const isProduction = process.env.NODE_ENV === 'production';
const basename = isProduction ? "/world-wise/" : "/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  base: basename,
});  

