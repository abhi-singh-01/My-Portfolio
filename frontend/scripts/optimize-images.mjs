import sharp from 'sharp';
import { statSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, 'image-sources');
const outputDir = path.join(__dirname, '../src/assets');

const targets = [
  { input: 'ecomplaint.png', output: 'ecomplaint.webp', width: 1200, quality: 82 },
  { input: 'ecomplaint.png', output: 'ecomplaint-640.webp', width: 640, quality: 80 },
  { input: 'weather.png', output: 'weather.webp', width: 1200, quality: 82 },
  { input: 'weather.png', output: 'weather-640.webp', width: 640, quality: 80 },
  { input: 'vaarta.png', output: 'vaarta.webp', width: 1200, quality: 82 },
];

for (const target of targets) {
  const inputPath = path.join(assetsDir, target.input);
  const outputPath = path.join(outputDir, target.output);

  await sharp(inputPath)
    .resize({ width: target.width, withoutEnlargement: true })
    .webp({ quality: target.quality, effort: 6 })
    .toFile(outputPath);

  const sizeKb = (statSync(outputPath).size / 1024).toFixed(1);
  console.log(`${target.output}: ${sizeKb} KB`);
}
