const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const candidateUrls = [
  // Wikimedia / Archive / CDN direct mountain road videos
  "https://assets.mixkit.co/videos/preview/mixkit-car-traveling-on-a-road-in-the-mountains-41545-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-winding-road-in-the-mountains-41544-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-curving-road-in-a-mountain-valley-41543-large.mp4",
  "https://cdn.coverr.co/videos/coverr-driving-on-a-mountain-road-5429/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-winding-road-in-the-mountains-5430/1080p.mp4",
  "https://cdn.coverr.co/videos/coverr-driving-down-a-scenic-highway-5428/1080p.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a2/Driving_through_the_Swiss_Alps.webm/Driving_through_the_Swiss_Alps.webm.720p.vp9.webm",
  "https://static.videezy.com/system/resources/previews/000/004/299/original/Mountain_Road_1080p.mp4"
];

const checkUrl = (url) => {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.request(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        resolve({ url, status: res.statusCode, contentType: res.headers['content-type'], contentLength: res.headers['content-length'] });
      });
      req.on('error', (err) => resolve({ url, status: 'ERR: ' + err.message }));
      req.setTimeout(8000, () => {
        req.destroy();
        resolve({ url, status: 'TIMEOUT' });
      });
      req.end();
    } catch (e) {
      resolve({ url, status: 'INVALID' });
    }
  });
};

async function test() {
  console.log("Checking mountain road video candidate URLs...");
  const results = await Promise.all(candidateUrls.map(checkUrl));
  results.forEach(r => console.log(`[${r.status}] [${r.contentType}] ${r.url} (size: ${r.contentLength})`));
}

test();
