import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const requiredFiles = [
  "index.html",
  "privacy.html",
  "404.html",
  "styles.css",
  "app.js",
  "products.json",
  "site-config.json",
  "robots.txt",
  "_headers",
  "admin/index.html",
  "admin/admin.js",
  "admin/admin.css",
  "assets/logo-cottagecore.webp",
  "assets/logo-raccoon-shop.webp",
  "assets/logo-woodland-badge.webp",
  "assets/plant-room.webp",
  "assets/plant-table.webp",
  "assets/plant-closeup.webp"
];

for (const file of requiredFiles) {
  await access(path.join(root, file));
}

const html = await readFile(path.join(root, "index.html"), "utf8");
const checks = [
  [html.includes("Strange Little Things"), "business name"],
  [html.includes("noindex"), "staging noindex metadata"],
  [html.includes("Website by RedBald LLC"), "RedBald footer credit"],
  [html.includes("id=\"shop\""), "shop section"],
  [html.includes("id=\"about\""), "about section"],
  [html.includes("id=\"facebook\""), "Facebook section"],
  [html.includes("aria-label"), "accessible labels"]
];

for (const [passed, label] of checks) {
  if (!passed) throw new Error(`Missing required check: ${label}`);
}

const products = JSON.parse(await readFile(path.join(root, "products.json"), "utf8"));
if (!Array.isArray(products) || products.length < 3) {
  throw new Error("products.json must contain at least three demo listings");
}

console.log(`All checks passed. ${requiredFiles.length} files verified.`);
