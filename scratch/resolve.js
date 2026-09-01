const https = require('https');

const ids = {
  "1. Ubud Monkey Forest": "9psBWMWGheA",
  "2. Tanah Lot Temple": "vVkayXvZnwQ",
  "3. Uluwatu Cliff Temple": "MeaTfXW-buc",
  "4. Eiffel Tower": "uYrACAHq6jI",
  "5. Louvre Museum": "9s5MWNVwDXQ",
  "6. Arc de Triomphe": "KX5ZQkluQ9U",
  "7. Oia Sunset Viewpoint": "KMGINljCmp8",
  "8. Red Beach Santorini": "PrpK_HQbdRI",
  "9. Akrotiri Archaeological Site": "kBf73LgW68A",
  "10. Burj Khalifa": "rbdQHqcu-yo",
  "11. The Dubai Mall": "nAbrzm-6o70",
  "12. Desert Safari Dunes": "bXsJnwcIykw",
  "13. Fushimi Inari Shrine": "N5LzTWrC5rs",
  "14. Kinkaku-ji (Golden Pavilion)": "O5V56hQoLAs",
  "15. Arashiyama Bamboo Grove": "fsJ0basri8U",
  "16. Matterhorn": "QrRSm-QbjW0",
  "17. Interlaken Lakes": "_vt2_V8k2O4",
  "18. Jungfraujoch - Top of Europe": "Ak8qVn1ghmM",
  "19. Male City Mosque": "NHgwN7426Is",
  "20. Banana Reef Diving": "Y_YSuBfQCmI",
  "21. Vaadhoo Island bioluminescent beach": "mhOdKnKpuRU",
  "22. Times Square": "Fk-vMfM0krQ",
  "23. Central Park": "A2CChTZvzTE",
  "24. Empire State Building": "VedK8_UlmkY"
};

function fetchImageId(key, shortId) {
  return new Promise((resolve) => {
    const url = `https://unsplash.com/photos/${shortId}`;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        // Search for og:image
        const match = data.match(/<meta property="og:image" content="(https:\/\/images\.unsplash\.com\/photo-[^?"]+)/);
        if (match && match[1]) {
          resolve({ key, url: match[1] });
        } else {
          // Try name="twitter:image"
          const twitterMatch = data.match(/<meta name="twitter:image" content="(https:\/\/images\.unsplash\.com\/photo-[^?"]+)/);
          if (twitterMatch && twitterMatch[1]) {
            resolve({ key, url: twitterMatch[1] });
          } else {
            resolve({ key, error: 'Not found' });
          }
        }
      });
    }).on('error', (err) => {
      resolve({ key, error: err.message });
    });
  });
}

async function run() {
  const results = {};
  for (const [key, shortId] of Object.entries(ids)) {
    console.log(`Resolving ${key}...`);
    const result = await fetchImageId(key, shortId);
    results[key] = result;
    // Sleep a bit to avoid rate limit
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('\n--- RESOLVED MAPPING ---');
  console.log(JSON.stringify(results, null, 2));
}

run();
