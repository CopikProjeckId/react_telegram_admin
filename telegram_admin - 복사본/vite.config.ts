import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginTerminal from 'vite-plugin-terminal'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    pluginTerminal({
      console: "terminal",
      output: ["terminal", "console"],
    }),
  ],
  server: {
    port: 3002,
    host: "0.0.0.0",
  },
})
