const https = require('https');
const fs = require('fs');
const path = require('path');

const checkUrl = (url) => {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
      });
      req.on('error', (err) => resolve({ url, status: 'ERR: ' + err.message, ok: false }));
      req.setTimeout(6000, () => {
        req.destroy();
        resolve({ url, status: 'TIMEOUT', ok: false });
      });
    } catch (e) {
      resolve({ url, status: 'INVALID', ok: false });
    }
  });
};

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (/\.(js|jsx|json)$/.test(file)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function run() {
  const srcDir = path.resolve('c:/Users/Labdhi/Desktop/Travel Planner/src');
  const allFiles = getAllFiles(srcDir);
  const urlRegex = /https:\/\/[^"'`\s)]+/g;
  const urlToFiles = {};

  for (const f of allFiles) {
    const content = fs.readFileSync(f, 'utf8');
    const matches = content.match(urlRegex) || [];
    for (const u of matches) {
      if (u.includes('unsplash.com') || u.includes('image') || u.includes('cdn')) {
        if (!urlToFiles[u]) urlToFiles[u] = [];
        urlToFiles[u].push(path.relative('c:/Users/Labdhi/Desktop/Travel Planner', f));
      }
    }
  }

  const urls = Object.keys(urlToFiles);
  console.log(`Checking ${urls.length} unique image URLs across entire src directory in parallel...`);

  // Run in chunks of 20
  const results = [];
  for (let i = 0; i < urls.length; i += 20) {
    const chunk = urls.slice(i, i + 20);
    const chunkResults = await Promise.all(chunk.map(checkUrl));
    results.push(...chunkResults);
  }

  const failed = results.filter(r => !r.ok);
  console.log(`\n================================`);
  console.log(`TOTAL FAILED URLS: ${failed.length}`);
  console.log(`================================`);
  failed.forEach(f => {
    console.log(`[Status ${f.status}] ${f.url}`);
    console.log(`  Found in: ${urlToFiles[f.url].join(', ')}`);
  });
}

run();
