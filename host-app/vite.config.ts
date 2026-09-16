import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
  server: {
    host: "127.0.0.1",
    port: 4000,
    cors: true,
    origin: "http://127.0.0.1:4000",
    strictPort: true,
  },
  preview: { host: "127.0.0.1", port: 4000, strictPort: true },
  build: { target: "esnext" },
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        accounts: env.VITE_ACCOUNTS_REMOTE_URL || "http://127.0.0.1:4001/assets/remoteEntry.js",
        transactions: env.VITE_TRANSACTIONS_REMOTE_URL || "http://127.0.0.1:4002/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  };
});
