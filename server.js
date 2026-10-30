/**
 * SMART CYLINDER BOOKING SYSTEM - BUILT-IN LOCAL SERVER
 * Zero-dependency Node.js HTTP server. Runs instantly on any machine with Node.
 * Engineering Team:
 * - Avanya Sinha: Frontend & UI/UX Design
 * - Mansi Kumari: Database Engineering & SQL Architecture
 * - Deepshikha Kumari: Backend Processing & Logic
 * - Chanchal Goyal: System Analysis & Modeling
 * - Kashish Kumari: Quality Assurance & Testing
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];

  // Route root to app/index.html
  if (reqUrl === '/' || reqUrl === '') {
    reqUrl = '/app/index.html';
  } else if (!reqUrl.startsWith('/app/') && fs.existsSync(path.join(__dirname, 'app', reqUrl))) {
    reqUrl = '/app' + reqUrl;
  }

  const filePath = path.join(__dirname, reqUrl);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h2>404 - Page Not Found</h2>
            <p>The requested path <code>${reqUrl}</code> was not found.</p>
            <a href="/app/index.html">← Back to Smart Cylinder Home</a>
          </div>
        `);
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🔥 SMART CYLINDER BOOKING SYSTEM SERVER RUNNING!`);
  console.log(`👉 Access URL: http://localhost:${PORT}`);
  console.log(`👥 Project by: Avanya, Chanchal, Mansi, Deepshikha, Kashish`);
  console.log(`=======================================================`);
});
