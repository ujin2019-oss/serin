import sharp from 'sharp';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const dir=new URL('../assets/images/',import.meta.url);
const files=(await fs.readdir(dir)).filter(f=>f.endsWith('.png')).sort();
const width=1000,cellW=250,cellH=210;
const tiles=[];
for(const[fileIndex,file]of files.entries()){
 const tile=await sharp(fileURLToPath(new URL(file,dir))).resize(242,180,{fit:'cover'}).toBuffer();
 tiles.push({input:tile,left:(fileIndex%4)*cellW+4,top:Math.floor(fileIndex/4)*cellH});
 const label=Buffer.from(`<svg width="250" height="30"><rect width="250" height="30" fill="#F4F2EA"/><text x="8" y="20" font-family="Arial" font-size="13" fill="#26352F">${file.replace('.png','')}</text></svg>`);
 tiles.push({input:label,left:(fileIndex%4)*cellW,top:Math.floor(fileIndex/4)*cellH+180});
}
await fs.mkdir(new URL('../.preview/',import.meta.url),{recursive:true});
await sharp({create:{width,height:Math.ceil(files.length/4)*cellH,channels:3,background:'#F4F2EA'}}).composite(tiles).png().toFile(fileURLToPath(new URL('../.preview/assets-contact-sheet.png',import.meta.url)));
console.log(`Contact sheet: ${files.length} images`);
