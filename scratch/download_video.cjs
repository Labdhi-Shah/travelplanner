const https = require('https');
const fs = require('fs');
const path = require('path');

const url = "https://shotstack-assets.s3.amazonaws.com/footage/road.mp4";
const dir = path.resolve('c:/Users/Labdhi/Desktop/Travel Planner/public/videos');
const dest = path.join(dir, 'mountain-road.mp4');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log(`Downloading ${url} to ${dest}...`);

const file = fs.createWriteStream(dest);
https.get(url, (response) => {
  if (response.statusCode !== 200) {
    console.error(`Failed to download: Status Code ${response.statusCode}`);
    return;
  }

  response.pipe(file);

  file.on('finish', () => {
    file.close();
    const stats = fs.statSync(dest);
    console.log(`Download complete! File size: ${stats.size} bytes (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
  });
}).on('error', (err) => {
  fs.unlink(dest, () => {});
  console.error(`Download error: ${err.message}`);
});
