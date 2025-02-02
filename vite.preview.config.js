import { defineConfig } from "vite";

export default defineConfig({
  root: "./preview",
  build: {
    outDir: "../dist-preview",
    emptyOutDir: true,
  },
  base: "./",
});
