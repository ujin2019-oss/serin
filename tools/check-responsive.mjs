// Checks final responsive declarations, not browser layout or screenshots.
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

function parse(css) {
  const nodes = [];
  let cursor = 0;
  while (cursor < css.length) {
    while (cursor < css.length && /\s/.test(css[cursor])) cursor++;
    if (css.slice(cursor, cursor + 2) === '/*') { cursor = css.indexOf('*/', cursor + 2) + 2; continue; }
    const open = css.indexOf('{', cursor);
    if (open < 0) break;
    const selector = css.slice(cursor, open).trim();
    let depth = 1, end = open + 1, quote = '';
    for (; end < css.length && depth; end++) {
      const char = css[end];
      if (quote) { if (char === quote && css[end - 1] !== '\\') quote = ''; continue; }
      if (char === '"' || char === "'") { quote = char; continue; }
      if (char === '{') depth++;
      if (char === '}') depth--;
    }
    assert.equal(depth, 0, `Balanced CSS: ${selector}`);
    const body = css.slice(open + 1, end - 1);
    nodes.push(selector.startsWith('@media') ? { selector, children: parse(body) } : { selector, body });
    cursor = end;
  }
  return nodes;
}

const css = await fs.readFile(new URL('../css/style.css', import.meta.url), 'utf8');
const responsive = await fs.readFile(new URL('../css/responsive.css', import.meta.url), 'utf8');
const rules = [...parse(css), ...parse(responsive)];
const normalize = selector => selector.replace(/\s+/g, '');
function declarations(width, selector) {
  const result = {};
  const visit = nodes => nodes.forEach(node => {
    if (node.children) {
      const min = node.selector.match(/min-width\s*:\s*(\d+)px/);
      const max = node.selector.match(/max-width\s*:\s*(\d+)px/);
      if (!min && !max) return;
      if ((!min || width >= Number(min[1])) && (!max || width <= Number(max[1]))) visit(node.children);
    } else if (node.selector.split(',').some(part => normalize(part) === normalize(selector))) {
      node.body.split(';').forEach(declaration => {
        const colon = declaration.indexOf(':');
        if (colon > 0) result[declaration.slice(0, colon).trim()] = declaration.slice(colon + 1).trim();
      });
    }
  });
  visit(rules);
  return result;
}

for (const width of [1440, 1280, 1024, 768, 390, 360]) {
  const ritual = declarations(width, '.ritual-grid');
  const product = declarations(width, '.product-grid');
  const journal = declarations(width, '.journal-grid');
  if (width <= 700) {
    assert.equal(product.display, 'flex');
    assert.equal(product['flex-direction'], 'column');
    assert.equal(ritual['grid-auto-flow'], 'column');
    assert.match(ritual['scroll-snap-type'], /^x /);
    assert.equal(ritual['overflow-x'], 'auto');
    const percent = Number.parseFloat(ritual['grid-auto-columns']);
    assert.ok(100 / percent >= 1.1 && 100 / percent <= 1.2, 'Next Ritual card remains partially visible');
    assert.equal(journal['flex-direction'], 'column');
    assert.equal(declarations(width, '.hero')['min-height'], '0');
    for (const selector of ['.philosophy-copy>p:not(.korean-title)', '.ingredients-copy>p:not(.korean-title)', '.ritual-card>p', '.journal-card>p', '.faq-list details>p']) {
      assert.ok(Number.parseFloat(declarations(width, selector)['font-size']) >= 14, `Readable mobile body: ${selector}`);
    }
  } else {
    assert.equal(product.display, 'grid');
    assert.match(ritual['grid-template-columns'], /repeat\(3,/);
    assert.equal(journal.display, 'grid');
  }
  assert.ok(Number.parseFloat(declarations(width, '.quantity-stepper button')['min-height']) >= 44);
  assert.ok(Number.parseFloat(declarations(width, '.quantity-stepper button').width) >= 44);
  assert.ok(Number.parseFloat(declarations(width, '.product-primary-cta')['min-height']) >= 44);
  assert.ok(Number.parseFloat(declarations(width, '.faq-list summary')['min-height']) >= 44);
  console.log(`PASS (CSS source only): ${width}px — product ${width <= 700 ? 'stack' : 'two columns'}, Ritual ${width <= 700 ? 'scroll-snap' : 'three columns'}, readable controls.`);
}
console.log('Rendered overflow, crop, overlap and native touch/focus behavior still require browser QA.');
