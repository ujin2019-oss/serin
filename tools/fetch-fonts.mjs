import fs from 'node:fs/promises';
const dir = new URL('../assets/fonts/',import.meta.url);
const manropeCss = await fetch('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap',{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'}}).then(r=>{if(!r.ok)throw Error(r.status);return r.text();});
const latin = manropeCss.match(/\/\* latin \*\/([\s\S]*?)(?:\n\}|$)/)?.[1] || manropeCss;
const manropeUrl = [...latin.matchAll(/url\(([^)]+)\)/g)].at(-1)?.[1];
if(!manropeUrl) throw Error('Manrope font URL missing');
const fonts=[['manrope-latin.woff2',manropeUrl],['pretendard-variable.woff2','https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2']];
for(const [name,url] of fonts){const response=await fetch(url);if(!response.ok)throw Error(`${name}: ${response.status}`);const buffer=Buffer.from(await response.arrayBuffer());if(buffer.subarray(0,4).toString()!=='wOF2')throw Error(`${name}: expected WOFF2 font format`);await fs.writeFile(new URL(name,dir),buffer);console.log(`Saved ${name}`);}
const licenses=[['Manrope-OFL.txt','https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt'],['Pretendard-OFL.txt','https://raw.githubusercontent.com/orioncactus/pretendard/main/LICENSE']];
for(const[name,url]of licenses){const response=await fetch(url);if(!response.ok)throw Error(`${name}: ${response.status}`);await fs.writeFile(new URL(name,dir),await response.text());}
