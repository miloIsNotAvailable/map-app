import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import e from '@babel/plugin-syntax-import-meta'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@Components": path.resolve( __dirname, 'components/assets' ),
      "@styles": path.resolve( __dirname, 'styles' )
    }
  },
  plugins: [react()],
})
