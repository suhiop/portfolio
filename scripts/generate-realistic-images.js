const fs = require('fs');
const path = require('path');
const https = require('https');

const projectsDir = path.join(__dirname, '../public/images/projects');

// 프로젝트 디렉토리가 없으면 생성
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// Picsum Photos를 사용한 실제 사진 다운로드
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Node.js' } }, (response) => {
      // 리다이렉트 처리
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
        return downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✓ ${path.basename(filepath)}`);
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
  console.log('🖼️  Downloading high-quality images from Picsum Photos...\n');

  for (let i = 1; i <= 35; i++) {
    const seed = i * 100; // 각 프로젝트마다 고유한 이미지

    try {
      // 썸네일 이미지 (600x400)
      const thumbUrl = `https://picsum.photos/seed/${seed}/600/400`;
      const thumbPath = path.join(projectsDir, `${i}-thumb.jpg`);
      await downloadImage(thumbUrl, thumbPath);

      await new Promise(resolve => setTimeout(resolve, 200));

      // 상세 이미지 3장 (1200x800) - 각기 다른 seed 사용
      for (let j = 1; j <= 3; j++) {
        const detailSeed = seed + j;
        const detailUrl = `https://picsum.photos/seed/${detailSeed}/1200/800`;
        const detailPath = path.join(projectsDir, `${i}-${j}.jpg`);
        await downloadImage(detailUrl, detailPath);

        await new Promise(resolve => setTimeout(resolve, 200));
      }

      console.log(`✅ Project ${i}/35 complete\n`);
    } catch (error) {
      console.error(`❌ Error for project ${i}:`, error.message);
    }
  }

  console.log('\n🎉 All 140 images downloaded!');
  console.log(`📁 Saved to: ${projectsDir}`);
  console.log('\nNext steps:');
  console.log('1. Run: node scripts/update-image-paths-jpg.js');
  console.log('2. Commit and push to GitHub');
  console.log('3. Deploy to Vercel');
}

downloadAllImages().catch(console.error);
