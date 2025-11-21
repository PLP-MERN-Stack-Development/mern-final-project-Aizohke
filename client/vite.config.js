
import { defineConfig } from 'vite' // <-- ADD THIS LINE
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})