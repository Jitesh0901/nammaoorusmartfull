import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '../src/assets/images');

async function convertToWebp(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      await convertToWebp(fullPath);
    } else if (/\.(png|jpe?g|jpeg)$/i.test(file)) {
      const outputName = file.replace(/\.(png|jpe?g|jpeg)$/i, '.webp');
      const outputPath = path.join(directory, outputName);

      try {
        await sharp(fullPath)
          .webp({ quality: 85 })
          .toFile(outputPath);
        
        console.log(`Converted: ${file} -> ${outputName}`);
        
        // Remove the original file
        fs.unlinkSync(fullPath);
        console.log(`Deleted: ${file}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
}

console.log('Starting Image Conversion to WebP...');
convertToWebp(IMAGES_DIR)
  .then(() => console.log('Conversion Complete!'))
  .catch(err => console.error('Overall Error:', err));
