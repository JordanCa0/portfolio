import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: process.env.VITE_BASE_URL ?? '/portfolio/',
  plugins: [react()],
  define: {
    // react-rnd's bundled react-draggable reads process.env.NODE_ENV at
    // runtime, which doesn't exist in the browser
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}));
