import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const apps = ["accounts-mfe", "transactions-mfe", "host-app"];
const task = process.argv[2] ?? "build";
const isWindows = process.platform === "win32";
const npm = "npm";
for (const app of apps) {
  console.log(`\n[FinFlow] ${task}: ${app}`);
  const args = task === "install" ? ["install"] : ["run", task];
  const result = spawnSync(npm, args, {
    cwd: resolve(root, app),
    stdio: "inherit",
    shell: isWindows,
  });
  if (result.error) {
    console.error(`[FinFlow] Could not start npm for ${app}:`, result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}
