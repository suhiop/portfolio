const fs = require('fs');
const path = require('path');

const projectsFilePath = path.join(__dirname, '../lib/data/projects.ts');
let content = fs.readFileSync(projectsFilePath, 'utf8');

console.log('🔄 Updating image paths from .svg to .jpg...\n');

// SVG를 JPG로 변경
content = content.replace(/\.svg/g, '.jpg');

fs.writeFileSync(projectsFilePath, content, 'utf8');

console.log('✅ Updated all image paths to .jpg format');
console.log('📝 Thumbnails: /images/projects/{id}-thumb.jpg');
console.log('📝 Detail images: /images/projects/{id}-1.jpg, {id}-2.jpg, {id}-3.jpg');
