const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 8765);
const host = process.env.HOST || "0.0.0.0";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav"
};

function resolveRequestPath(requestUrl) {
  const pathname = new URL(requestUrl, `http://${host}:${port}`).pathname;
  const requested = pathname === "/" ? "/index.html" : pathname;
  const file = path.resolve(root, `.${decodeURIComponent(requested)}`);
  return file.startsWith(root) ? file : null;
}

const server = http.createServer((request, response) => {
  const file = resolveRequestPath(request.url || "/");
  if (!file) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  fs.stat(file, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404);
      response.end("Not Found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    fs.createReadStream(file).pipe(response);
  });
});

server.listen(port, host, () => {
  console.log(`Serving ${root} on http://${host}:${port}/`);
});
