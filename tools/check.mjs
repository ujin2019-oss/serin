import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';
const root = path.resolve(import.meta.dirname,'..');
const html = await fs.readFile(path.join(root,'index.html'),'utf8');
const {document} = parseHTML(html);
const ids = [...document.querySelectorAll('[id]')].map(el=>el.id);
assert.equal(ids.length,new Set(ids).size,'IDs must be unique');
assert.equal(document.querySelectorAll('main > section').length,10,'Exactly ten main sections');
assert.equal(document.querySelectorAll('h1').length,1,'One h1');
assert.equal(document.documentElement.lang,'ko');
const missing=[];
for(const el of document.querySelectorAll('[src], link[href], a[href]')) {
  for(const attr of ['src','href']) {
    const value=el.getAttribute(attr);
    if(!value || /^(https?:|mailto:|tel:)/.test(value)) continue;
    if(value.startsWith('#')) { assert.ok(document.getElementById(value.slice(1)),`Missing anchor ${value}`); continue; }
    try { await fs.access(path.resolve(root,value)); } catch { missing.push(value); }
  }
}
assert.deepEqual(missing,[],'Every local asset must exist');
for(const img of document.querySelectorAll('img')) { assert.ok(img.hasAttribute('alt'),'Every image needs alt'); assert.ok(img.getAttribute('width') && img.getAttribute('height'),'Every image reserves space'); }
for(const button of document.querySelectorAll('[data-open]')) assert.ok(document.getElementById(button.dataset.open),`Missing dialog ${button.dataset.open}`);
assert.equal(document.querySelectorAll('.faq-list details').length,5);
assert.equal(document.querySelectorAll('.journal-dialog').length,3);
assert.ok(!/가상|데모|PORTFOLIO DEMO/.test(html), 'No virtual-product or demo notices in the page');
const css=await fs.readFile(path.join(root,'css/style.css'),'utf8');
assert.ok(css.includes('prefers-reduced-motion'));
for(const font of ['manrope-latin.woff2','pretendard-variable.woff2']) {const bytes=await fs.readFile(path.join(root,'assets/fonts',font));assert.equal(bytes.subarray(0,4).toString(),'wOF2',`Valid WOFF2: ${font}`);}
assert.equal(document.querySelectorAll('dialog').length,5);
console.log(`PASS: ten sections, unique IDs, ${document.querySelectorAll('img').length} accessible images, all local assets and anchors, five dialogs, five FAQs, reduced motion and local fonts.`);
