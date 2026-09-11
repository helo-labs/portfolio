import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// O Cloudflare serve da raiz, o GitHub Pages serve de /portfolio/. A base entra
// por variável de ambiente para o mesmo código atender aos dois sem página em
// branco. Os caminhos dos prints leem isso via import.meta.env.BASE_URL.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
})
