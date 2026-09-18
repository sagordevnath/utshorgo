import sharp from 'sharp';
import fs from 'node:fs';

const SRC = 'assets/Utshorgo_New Logo.png';
const meta = await sharp(SRC).metadata();
console.log(`source: ${meta.width}x${meta.height}, ${(fs.statSync(SRC).size / 1024).toFixed(0)} KB`);

// Trim transparent border so sizing is predictable, then produce 1x/2x header assets.
const trimmed = await sharp(SRC, { limitInputPixels: false }).trim({ threshold: 10 }).png().toBuffer();
const tmeta = await sharp(trimmed).metadata();
console.log(`trimmed: ${tmeta.width}x${tmeta.height}`);

const outputs = [
  ['utshorgo-logo@1x.png', 40],
  ['utshorgo-logo@2x.png', 80],
];
for (const [name, h] of outputs) {
  const out = await sharp(trimmed)
    .resize({ height: h, kernel: 'lanczos3' })
    .png({ compressionLevel: 9, effort: 10, palette: false })
    .toBuffer();
  const file = `client/src/assets/${name}`;
  fs.writeFileSync(file, out);
  const m = await sharp(out).metadata();
  console.log(`wrote ${file}: ${m.width}x${m.height}, ${(out.length / 1024).toFixed(1)} KB`);
}
