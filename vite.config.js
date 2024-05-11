import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import inject from '@rollup/plugin-inject';
import path from 'path'; // Import the path module

// Function to resolve paths using import.meta.url
function resolvePath(relativePath) {
  return path.resolve(new URL(import.meta.url).pathname, relativePath);
}

export default defineConfig({
  plugins: [
    react(),
    // inject({ Buffer: ['buffer', 'Buffer'] }), // Inject the Buffer module
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Use the path.resolve method
    },
  },
  // build: {
  //   rollupOptions: {
  //     input: {
  //       // main: resolvePath('index.html'), // Use the resolvePath function
  //       main: path.resolve(process.cwd(), './src/main.jsx'), // Use the resolvePath function
  //     },
  //   },
  // },
  clearScreen: false,
});

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import inject from '@rollup/plugin-inject';
// import path from 'path'; // Import the path module

// // Function to resolve paths using import.meta.url
// function resolvePath(relativePath) {
//   return path.resolve(new URL(import.meta.url).pathname, relativePath);
// }

// export default defineConfig({
//   plugins: [
//     react(),
//     // inject({ Buffer: ['buffer', 'Buffer'] }), // Inject the Buffer module
//   ],
//   resolve: {
//     alias: {
//       '@': resolvePath('./src'), // Use the resolvePath function
//     },
//   },
//   build: {
//     rollupOptions: {
//       input: {
//         main: resolvePath('index.html'), // Use the resolvePath function
//       },
//     },
//   },
//   clearScreen: false,
// });
