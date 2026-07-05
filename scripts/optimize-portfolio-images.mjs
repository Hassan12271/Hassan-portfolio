import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const portfolioDir = path.join(__dirname, '../public/images/portfolio');

const files = fs.readdirSync(portfolioDir).filter((file) => file.endsWith('.png'));

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const filePath = path.join(portfolioDir, file);
  const before = fs.readFileSync(filePath);
  const isLarge = file.includes('-large');
  const maxWidth = isLarge ? 1400 : 640;

  const optimized = await sharp(before)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .png({ quality: 78, compressionLevel: 9, palette: true })
    .toBuffer();

  totalBefore += before.length;
  totalAfter += optimized.length;
  fs.writeFileSync(filePath, optimized);

  console.log(
    `${file}: ${(before.length / 1024).toFixed(0)}KB -> ${(optimized.length / 1024).toFixed(0)}KB`,
  );
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`,
);
