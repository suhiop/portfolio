const fs = require('fs');
const path = require('path');
const https = require('https');

// Unsplash Source API를 사용한 무료 이미지 다운로드
// 각 프로젝트 타입별로 적합한 키워드 사용

const imageKeywords = [
  'minimal-design', 'digital-marketing', 'conference', 'technology',
  'fashion', 'music-festival', 'organic-food', 'website-design',
  'art-exhibition', 'luxury-hotel', 'mobile-app', 'product-launch',
  'fashion-brand', 'social-media', 'trade-show', 'brewery',
  'ecommerce', 'cultural-event', 'finance', 'video-production',
  'corporate-event', 'wellness', 'interactive-design', 'awards',
  'automotive', 'newsletter', 'popup-store', 'restaurant',
  'podcast', 'charity', 'cosmetics', 'brand-guidelines',
  'fashion-week', 'real-estate', 'streaming'
];

const projectsDir = path.join(__dirname, '../public/images/projects');

// 프로젝트 디렉토리가 없으면 생성
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // 리다이렉트 처리
        return downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function downloadAllImages() {
  console.log('🚀 Starting image download from Unsplash...\n');

  for (let i = 1; i <= 35; i++) {
    const keyword = imageKeywords[i - 1] || 'design';

    try {
      // 썸네일 이미지 (600x400)
      const thumbUrl = `https://source.unsplash.com/600x400/?${keyword}`;
      const thumbPath = path.join(projectsDir, `${i}-thumb.jpg`);
      await downloadImage(thumbUrl, thumbPath);

      // 약간의 딜레이 (API 제한 방지)
      await new Promise(resolve => setTimeout(resolve, 300));

      // 상세 이미지 3장 (1200x800)
      for (let j = 1; j <= 3; j++) {
        const detailUrl = `https://source.unsplash.com/1200x800/?${keyword},${j}`;
        const detailPath = path.join(projectsDir, `${i}-${j}.jpg`);
        await downloadImage(detailUrl, detailPath);

        // 약간의 딜레이
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      console.log(`\n✅ Completed project ${i}/35\n`);
    } catch (error) {
      console.error(`❌ Error downloading images for project ${i}:`, error.message);
    }
  }

  console.log('\n🎉 All images downloaded successfully!');
  console.log(`📁 Location: ${projectsDir}`);
}

downloadAllImages().catch(console.error);
