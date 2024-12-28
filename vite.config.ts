import { defineConfig } from "vite";
import ElementPlus from "unplugin-element-plus/vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), ElementPlus({})],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@@types": path.resolve(__dirname, "./src/types"),
    },
  },
});
