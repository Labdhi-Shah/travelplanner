const https = require('https');

const videoCandidates = [
  "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
  "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
  "https://vjs.zencdn.net/v/oceans.mp4",
  "https://media.w3.org/2010/05/sintel/trailer.mp4"
];

const checkUrl = (url) => {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const req = https.request(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
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
  console.log("Checking video URLs...");
  const results = await Promise.all(videoCandidates.map(checkUrl));
  results.forEach(r => console.log(`[${r.status}] [${r.contentType}] ${r.url} (size: ${r.contentLength})`));
}

test();
