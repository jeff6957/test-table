import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import less from 'vite-plugin-less'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: "parens-division",
      },
    },
  },
});
