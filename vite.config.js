import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // API backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Xóa `/api` trong URL
      },
    },
  },
});
