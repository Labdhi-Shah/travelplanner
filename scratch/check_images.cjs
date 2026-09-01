const https = require('https');
const http = require('http');

const checkUrl = (url) => {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
      });
      req.on('error', (err) => resolve({ url, status: 'ERROR: ' + err.message, ok: false }));
      req.setTimeout(5000, () => {
        req.destroy();
        resolve({ url, status: 'TIMEOUT', ok: false });
      });
    } catch (e) {
      resolve({ url, status: 'INVALID URL', ok: false });
    }
  });
};

async function run() {
  const fs = require('fs');
  const path = require('path');
  
  const files = [
    'src/data/destinations.js',
    'src/data/hotels.js',
    'src/data/packages.js',
    'src/data/mockUser.js',
    'src/pages/Home.jsx',
    'src/pages/About.jsx',
    'src/pages/Experiences.jsx'
  ];

  const urlRegex = /https:\/\/[^"'`\s)]+/g;
  const allUrls = new Set();

  for (const f of files) {
    const fullPath = path.resolve('c:/Users/Labdhi/Desktop/Travel Planner', f);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(urlRegex) || [];
      matches.forEach(u => allUrls.add(u));
    }
  }

  console.log(`Checking ${allUrls.size} URLs...`);
  const results = [];
  for (const u of allUrls) {
    const res = await checkUrl(u);
    results.push(res);
  }

  const failed = results.filter(r => !r.ok);
  console.log(`Failed URLs (${failed.length}):`);
  failed.forEach(f => console.log(`[${f.status}] ${f.url}`));
}

run();
