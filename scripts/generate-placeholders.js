const fs = require('fs');
const path = require('path');

// SVG 기반 placeholder 생성 함수
function createSVGPlaceholder(width, height, text, bgColor = '#e5e5e5', textColor = '#666666') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
}

// GIF placeholder 생성 (animated)
function createAnimatedSVG(width, height, text, bgColor = '#e5e5e5') {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${Date.now()}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1">
        <animate attributeName="stop-color" values="${bgColor};#d0d0d0;${bgColor}" dur="2s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" style="stop-color:#d0d0d0;stop-opacity:1">
        <animate attributeName="stop-color" values="#d0d0d0;${bgColor};#d0d0d0" dur="2s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad${Date.now()})"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="#666666" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
}

const projectsDir = path.join(__dirname, '../public/images/projects');

// 프로젝트 디렉토리가 없으면 생성
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// 35개 프로젝트용 이미지 생성
const colors = [
  '#f5f5f5', '#e5e5e5', '#d4d4d4', '#c4c4c4', '#b4b4b4',
  '#a4a4a4', '#949494', '#848484', '#f0f0f0', '#ebebeb',
  '#d5d5d5', '#c5c5c5', '#b5b5b5', '#a5a5a5', '#959595',
  '#858585', '#f8f8f8', '#e8e8e8', '#d8d8d8', '#c8c8c8',
  '#b8b8b8', '#a8a8a8', '#989898', '#888888', '#fafafa',
  '#eeeeee', '#dedede', '#cecece', '#bebebe', '#aeaeee',
  '#9e9e9e', '#8e8e8e', '#fcfcfc', '#ececec', '#dcdcdc'
];

for (let i = 1; i <= 35; i++) {
  const projectId = i.toString();
  const color = colors[i - 1] || '#e5e5e5';

  // 썸네일용 SVG (animated effect)
  const thumbSVG = createAnimatedSVG(600, 400, `Project ${i}`, color);
  fs.writeFileSync(
    path.join(projectsDir, `${projectId}-thumb.svg`),
    thumbSVG
  );

  // 상세 이미지 3장 생성
  for (let j = 1; j <= 3; j++) {
    const detailSVG = createSVGPlaceholder(
      1200,
      800,
      `Project ${i} - Image ${j}`,
      color,
      '#555555'
    );
    fs.writeFileSync(
      path.join(projectsDir, `${projectId}-${j}.svg`),
      detailSVG
    );
  }
}

console.log('✅ Generated placeholder images for 35 projects');
console.log(`📁 Location: ${projectsDir}`);
