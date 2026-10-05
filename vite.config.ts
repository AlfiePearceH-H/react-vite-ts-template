import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";
// import { powerApps } from '@microsoft/power-apps-vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()/*, powerApps()*/, tailwindcss()],
})
