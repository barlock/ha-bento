import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import terser from '@rollup/plugin-terser';

const isProd = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: 'src/bento.ts',
      name: 'Bento',
      // the proper extensions will be added
      fileName: 'bento',
    },
    //    rollupOptions: {
    //      plugins: [terser()],
    //    },
    //    rollupOptions: {
    //      // make sure to externalize deps that shouldn't be bundled
    //      // into your library
    //      external: ['vue'],
    //      output: {
    //        // Provide global variables to use in the UMD build
    //        // for externalized deps
    //        globals: {
    //          vue: 'Vue',
    //        },
    //      },
    //    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"],
    },
  }), ...(isProd ? [terser()] : [])],
});
