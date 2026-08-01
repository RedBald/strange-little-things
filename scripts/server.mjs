import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve("src");
const port = Number(process.env.PORT || 8080);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);
    let relative = decodeURIComponent(url.pathname);
    if (relative.endsWith("/")) relative += "index.html";
    const filePath = path.resolve(root, `.${relative}`);
    if (!filePath.startsWith(root)) throw new Error("Invalid path");

    let target = filePath;
    try {
      const info = await stat(target);
      if (info.isDirectory()) target = path.join(target, "index.html");
    } catch {
      target = path.join(root, "404.html");
      response.statusCode = 404;
    }

    const body = await readFile(target);
    response.setHeader("Content-Type", types[path.extname(target)] || "application/octet-stream");
    response.setHeader("Cache-Control", "no-store");
    response.end(body);
  } catch (error) {
    response.statusCode = 500;
    response.end(`Server error: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
});

server.listen(port, () => {
  console.log(`Strange Little Things demo: http://localhost:${port}`);
});
