import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
const isVercel = process.env.VERCEL === '1'

export default defineConfig({
  base: isVercel ? '/' : '/portofolio/',
  plugins: [react(), tailwindcss()],
})
