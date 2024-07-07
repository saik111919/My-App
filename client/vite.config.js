// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [react()],
  // You can customize the port here
  // server: {
  //   port: 3000,
  // },
  resolve: {
    alias: {
      // Customize file extensions and aliases as needed
      '@': '/src',
    },
    // You can also configure file extensions here
    // extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  // Configure how Vite treats files
  // The default behavior is to handle CSS, JSON, and images by default
  // To customize, you can use Vite plugins
  // For example, you can use `vite-plugin-svg` for SVG files
  // plugins: [svgPlugin()],
  // If you need to support older browsers, you might want to add polyfills
  // polyfill: {
  //   targets: ['ie >= 11'],
  // },
  // Configure the base URL for your application, useful if your app is hosted in a subdirectory
  // base: '/my-app/',
  // Customize the output directory for the build
  // outDir: 'dist',
  // Enable or disable sourcemaps for production builds
  // sourcemap: false,
  // Configure how Vite treats ES modules in dependencies
  // optimizeDeps: {
  //   include: ['module-name'],
  // },
  // Customize the behavior of the Vite dev server
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:3001',
  //   },
  // },
});
