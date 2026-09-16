import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const isWindows = process.platform === "win32";
const npm = "npm";
const build = spawnSync(process.execPath, [resolve(root, "scripts/run-all.mjs"), "build"], { stdio: "inherit" });
if (build.status !== 0) process.exit(build.status ?? 1);

const apps = ["accounts-mfe", "transactions-mfe", "host-app"];
const children = apps.map((app) => spawn(npm, ["run", "preview"], {
  cwd: resolve(root, app),
  stdio: "inherit",
  shell: isWindows,
}));
const stop = () => { children.forEach((child) => child.kill()); process.exit(); };
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
children.forEach((child) => child.on("exit", (code) => { if (code && code !== 0) stop(); }));
setTimeout(() => console.log("\nFinFlow is ready: http://127.0.0.1:4000\nPress Ctrl+C to stop all applications."), 1200);
