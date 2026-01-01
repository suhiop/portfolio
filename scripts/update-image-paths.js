const fs = require('fs');
const path = require('path');

const projectsFilePath = path.join(__dirname, '../lib/data/projects.ts');
let content = fs.readFileSync(projectsFilePath, 'utf8');

// placehold.co URL을 로컬 경로로 변경
for (let i = 1; i <= 35; i++) {
  const id = i.toString();

  // 썸네일 교체 (여러 패턴 대응)
  content = content.replace(
    new RegExp(`thumbnail: 'https://placehold\\.co/600x400/[^']+`,  'g'),
    (match, offset) => {
      // 해당 프로젝트 ID 찾기
      const beforeMatch = content.substring(Math.max(0, offset - 200), offset);
      const idMatch = beforeMatch.match(/id: '(\d+)'/);
      if (idMatch) {
        return `thumbnail: '/images/projects/${idMatch[1]}-thumb.svg'`;
      }
      return match;
    }
  );
}

// images 배열 교체
for (let i = 1; i <= 35; i++) {
  const id = i.toString();

  // 각 프로젝트의 images 배열 찾기 및 교체
  const projectRegex = new RegExp(
    `(id: '${id}',[\\s\\S]*?images: \\[)[\\s\\S]*?(\\],)`,
    'g'
  );

  content = content.replace(projectRegex, (match, prefix, suffix) => {
    return `${prefix}
      '/images/projects/${id}-1.svg',
      '/images/projects/${id}-2.svg',
      '/images/projects/${id}-3.svg',
    ${suffix}`;
  });
}

fs.writeFileSync(projectsFilePath, content, 'utf8');

console.log('✅ Updated all image paths in projects.ts');
console.log('📝 Thumbnails: /images/projects/{id}-thumb.svg');
console.log('📝 Detail images: /images/projects/{id}-1.svg, {id}-2.svg, {id}-3.svg');
