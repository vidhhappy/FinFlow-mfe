import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 4002,
    cors: true,
    origin: "http://127.0.0.1:4002",
    strictPort: true,
  },
  preview: { host: "127.0.0.1", port: 4002, cors: true, strictPort: true },

  build: {
    target: "esnext",
    cssCodeSplit: false,
  },

  plugins: [
    react(),
    federation({
      name: "transactions",
      filename: "remoteEntry.js",

      exposes: {
        "./TransactionsApp": "./src/App.tsx",
      },

      shared: {
        react: {
          requiredVersion: false,
        },
        "react-dom": {
          requiredVersion: false,
        },
      },
    }),
  ],
});
