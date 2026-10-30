const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function findFile(reqUrl) {
  let cleanUrl = decodeURIComponent(reqUrl.split('?')[0]);
  if (cleanUrl === '/' || cleanUrl === '') cleanUrl = '/index.html';
  const rel = cleanUrl.replace(/^\/+/, '');

  const searchDirs = [
    path.join(__dirname, 'app'),
    __dirname,
    path.join(__dirname, 'smart Cylender', 'app'),
    path.join(__dirname, 'smart Cylender')
  ];

  const candidateNames = [rel, rel.replace(/^app\//, ''), path.join('app', rel)];

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir)) continue;
    for (const name of candidateNames) {
      const candidate = path.join(dir, name);
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
    }
  }

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir)) continue;
    const candidate = path.join(dir, 'index.html');
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const reqUrl = req.url.split('?')[0];
  const targetFile = findFile(reqUrl);

  if (targetFile) {
    const ext = path.extname(targetFile).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    fs.readFile(targetFile, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Server Error: ${err.message}`);
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h2>404 - File Not Found</h2><p>Please ensure app folder is committed to GitHub.</p>');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
