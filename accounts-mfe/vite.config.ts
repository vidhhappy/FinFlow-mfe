import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 4001,
    cors: true,
    origin: "http://127.0.0.1:4001",
    strictPort: true,
  },
  preview: { host: "127.0.0.1", port: 4001, cors: true, strictPort: true },

  build: {
    target: "esnext",
    cssCodeSplit: false,
  },
  plugins: [
    react(),
    federation({
      name: "accounts",
      filename: "remoteEntry.js",

      exposes: {
        "./AccountsApp": "./src/App.tsx",
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
