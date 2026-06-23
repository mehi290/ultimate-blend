import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React vendor bundle
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Supabase — only loaded when needed
          "vendor-supabase": ["@supabase/supabase-js"],
          // Charts — heavy, only used in admin
          "vendor-recharts": ["recharts"],
          // Tanstack Query
          "vendor-query": ["@tanstack/react-query"],
          // Date utilities
          "vendor-datefns": ["date-fns"],
        },
      },
    },
  },
}));

