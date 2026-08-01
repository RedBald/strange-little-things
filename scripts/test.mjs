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
  "assets/logo-woodland-badge.webp"
];

for (const file of requiredFiles) {
  await access(path.join(root, file));
}

const html = await readFile(path.join(root, "index.html"), "utf8");
const css = await readFile(path.join(root, "styles.css"), "utf8");
const app = await readFile(path.join(root, "app.js"), "utf8");
const adminHtml = await readFile(path.join(root, "admin/index.html"), "utf8");
const adminApp = await readFile(path.join(root, "admin/admin.js"), "utf8");
const productsSource = await readFile(path.join(root, "products.json"), "utf8");
const checks = [
  [html.includes("Strange Little Things"), "business name"],
  [html.includes("noindex"), "staging noindex metadata"],
  [html.includes("Website by RedBald LLC"), "RedBald footer credit"],
  [html.includes("id=\"featured\""), "featured section"],
  [html.includes("id=\"categories\""), "category section"],
  [html.includes("id=\"about\""), "about section"],
  [html.includes("id=\"facebook\""), "Facebook section"],
  [html.includes("aria-label=\"Primary navigation\""), "primary navigation label"],
  [html.includes("<main id=\"main\">"), "main landmark"],
  [html.includes("<footer class=\"site-footer\">"), "footer landmark"],
  [html.includes("width=\"900\" height=\"900\""), "hero intrinsic dimensions"],
  [css.includes("object-fit:contain"), "approved artwork containment"],
  [css.includes("height:auto"), "approved artwork aspect ratio"],
  [html.includes("href=\"admin/\""), "admin internal link"],
  [html.includes("href=\"privacy.html\""), "privacy internal link"]
];

for (const [passed, label] of checks) {
  if (!passed) throw new Error(`Missing required check: ${label}`);
}

const removedPhotos = ["plant-room.webp", "plant-table.webp", "plant-closeup.webp"];
const publicSource = `${html}\n${css}\n${app}\n${productsSource}\n${adminHtml}\n${adminApp}`;
for (const photo of removedPhotos) {
  if (publicSource.includes(photo)) throw new Error(`Removed real photo is still referenced: ${photo}`);
  try {
    await access(path.join(root, "assets", photo));
    throw new Error(`Removed real photo still exists in build: ${photo}`);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Removed real photo")) throw error;
  }
}

const robots = await readFile(path.join(root, "robots.txt"), "utf8");
const headers = await readFile(path.join(root, "_headers"), "utf8");
if (!robots.includes("Disallow: /")) throw new Error("robots.txt must block crawling");
if (!headers.toLowerCase().includes("x-robots-tag: noindex, nofollow")) throw new Error("Cloudflare headers must preserve noindex and nofollow");

const internalTargets = ["privacy.html", "admin/index.html"];
for (const target of internalTargets) await access(path.join(root, target));

const products = JSON.parse(productsSource);
if (!Array.isArray(products) || products.length < 3) {
  throw new Error("products.json must contain at least three demo listings");
}

if (products.some((product) => "image" in product || "alt" in product)) throw new Error("Demo products must use illustrated placeholders, not photo fields");

console.log(`All checks passed. ${requiredFiles.length} files and ${checks.length} site requirements verified.`);
