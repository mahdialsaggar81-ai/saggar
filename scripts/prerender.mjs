import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const root = process.cwd();
const outputPath = path.join(root, "dist", "public", "index.html");
Object.defineProperty(globalThis, "location", {
  value: new URL("http://localhost/"),
  configurable: true,
});
const vite = await createServer({
  configFile: path.join(root, "vite.config.ts"),
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.tsx");
  const markup = renderToString(createElement(App));
  const html = await readFile(outputPath, "utf8");
  const rootPlaceholder = '<div id="root"></div>';
  if (!html.includes(rootPlaceholder)) {
    throw new Error("Could not find the root placeholder in the built HTML.");
  }
  await writeFile(outputPath, html.replace(rootPlaceholder, `<div id="root">${markup}</div>`), "utf8");
  console.log("Static React markup written to dist/public/index.html");
} finally {
  await vite.close();
}
