import { spawnSync } from "node:child_process";
import { cp, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const packageManager = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const build = spawnSync(packageManager, ["build:static"], {
  cwd: root,
  env: { ...process.env, VITE_BASE_PATH: "/saggar/" },
  stdio: "inherit",
});

if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const output = path.join(root, "dist", "public");
for (const name of ["assets", "api", "index.html", "favicon.svg"]) {
  await rm(path.join(root, name), { recursive: true, force: true });
  await cp(path.join(output, name), path.join(root, name), { recursive: true });
}
await writeFile(path.join(root, ".nojekyll"), "", "utf8");
console.log("GitHub Pages output synchronized to the repository root.");
