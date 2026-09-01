const https = require('https');
const { destinations } = require('../src/data/destinations.js');

const checkUrl = (url) => {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      resolve({ url, status: res.statusCode, ok: res.statusCode === 200 || res.statusCode === 302 || res.statusCode === 301 });
    });
    req.on('error', (e) => resolve({ url, status: e.message, ok: false }));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ url, status: 'TIMEOUT', ok: false });
    });
  });
};

async function testAllDestinations() {
  console.log('Testing all destination images, gallery, and attractions...');
  let totalTested = 0;
  let allPass = true;

  for (const dest of destinations) {
    console.log(`\n--- ${dest.name} (${dest.country}) ---`);
    // Main image
    const mainRes = await checkUrl(dest.image);
    console.log(`Main Image: [${mainRes.status}] ${mainRes.ok ? 'PASS' : 'FAIL'}`);
    if (!mainRes.ok) allPass = false;
    totalTested++;

    // Gallery
    for (let i = 0; i < dest.gallery.length; i++) {
      const gRes = await checkUrl(dest.gallery[i]);
      console.log(`Gallery[${i}]: [${gRes.status}] ${gRes.ok ? 'PASS' : 'FAIL'}`);
      if (!gRes.ok) allPass = false;
      totalTested++;
    }

    // Attractions
    for (const att of dest.attractions) {
      const attRes = await checkUrl(att.image);
      console.log(`Attraction "${att.name}": [${attRes.status}] ${attRes.ok ? 'PASS' : 'FAIL'} - ${att.image}`);
      if (!attRes.ok) allPass = false;
      totalTested++;
    }
  }

  console.log(`\n================================`);
  console.log(`SUMMARY: Tested ${totalTested} images. All valid: ${allPass}`);
  console.log(`================================`);
}

testAllDestinations();
