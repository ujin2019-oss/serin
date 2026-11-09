import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = new URL('../assets/images/', import.meta.url);
const files = (await fs.readdir(dir)).filter(name => name.endsWith('.png'));
for (const file of files) {
  const source = new URL(file, dir);
  const name = path.parse(file).name;
  const maxWidth = name === 'hero-full-v2' || name === 'hero-sensory' ? 1920 : name === 'hero-master' || name.startsWith('campaign-main') || name === 'texture-macro' ? 1536 : 1024;
  const pipeline = sharp(fileURLToPath(source)).rotate();
  const tasks = [pipeline.clone().resize({width:maxWidth,withoutEnlargement:true}).webp({quality:85,effort:6}).toFile(fileURLToPath(new URL(`${name}.webp`,dir)))];
  if (name === 'hero-master') tasks.push(pipeline.clone().resize({width:768}).webp({quality:82,effort:6}).toFile(fileURLToPath(new URL(`${name}-768.webp`,dir))));
  if (name === 'hero-full-v2') tasks.push(pipeline.clone().resize({width:1024}).webp({quality:82,effort:6}).toFile(fileURLToPath(new URL(`${name}-1024.webp`,dir))));
  if (name === 'hero-full-v2-mobile') tasks.push(pipeline.clone().resize({width:768}).webp({quality:82,effort:6}).toFile(fileURLToPath(new URL(`${name}-768.webp`,dir))));
  if (name === 'hero-sensory') tasks.push(pipeline.clone().resize({width:1024}).webp({quality:82,effort:6}).toFile(fileURLToPath(new URL(`${name}-1024.webp`,dir))));
  if (name === 'hero-sensory-mobile') tasks.push(pipeline.clone().resize({width:768}).webp({quality:82,effort:6}).toFile(fileURLToPath(new URL(`${name}-768.webp`,dir))));
  if (name.startsWith('product-')) tasks.push(pipeline.clone().resize({width:320}).webp({quality:80,effort:6}).toFile(fileURLToPath(new URL(`${name}-320.webp`,dir))));
  await Promise.all(tasks);
  console.log(`Optimized ${name}`);
}
