import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 4000,
    cors: true,
    origin: "http://127.0.0.1:4000",
    strictPort: true,
  },
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        accounts: "http://127.0.0.1:4001/remoteEntry.js",
        transactions: "http://127.0.0.1:4002/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});