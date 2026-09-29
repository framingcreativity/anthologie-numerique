import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const config = JSON.parse(await readFile(new URL('../src/app/data/pages.json', import.meta.url), 'utf8'));
const env = loadEnv('production', fileURLToPath(new URL('../', import.meta.url)), 'VITE_');
const siteUrl = (env.VITE_SITE_URL || config.siteUrl).replace(/\/+$/, '');
const base = `/${(env.VITE_BASE_PATH || config.basePath).replace(/^\/+|\/+$/g, '')}/`.replace(/\/+/g, '/');
const dist = new URL('../dist/', import.meta.url);
const errors = [];
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

for (const [key, page] of Object.entries(config.pages)) {
  const file = key === '404' ? '404.html' : `${page.path.slice(1)}index.html`;
  let html;
  try { html = await readFile(new URL(file, dist), 'utf8'); }
  catch { errors.push(`${file} : fichier manquant`); continue; }

  const expectTag = (pattern, expected, label) => {
    const matches = [...html.matchAll(pattern)];
    if (matches.length !== 1 || matches[0][1] !== escapeHtml(expected)) {
      errors.push(`${file} : ${label} absent, dupliqué ou incorrect`);
    }
  };
  expectTag(/<title>([\s\S]*?)<\/title>/g, page.title, 'title');
  const expectedMeta = {
    description: page.description,
    robots: key === 'home' || key === 'about' ? 'index,follow' : 'noindex,nofollow',
    'og:title': page.title,
    'og:description': page.description,
    'og:type': 'website',
  };
  if (page.path) expectedMeta['og:url'] = `${siteUrl}${page.path}`;
  for (const [name, value] of Object.entries(expectedMeta)) {
    expectTag(new RegExp(`<meta (?:name|property)="${name}" content="([^"<>]*)"[^>]*>`, 'g'), value, name);
  }
  if (page.path) {
    expectTag(/<link rel="canonical" href="([^"<>]*)"[^>]*>/g, `${siteUrl}${page.path}`, 'canonical');
  } else if (/rel=["']canonical["']|property=["']og:url["']/.test(html)) {
    errors.push(`${file} : canonical ou og:url interdit`);
  }

  const assets = [...html.matchAll(/(?:src|href)="([^"<>]*\/assets\/[^"<>]+)"/g)];
  if (!assets.length) errors.push(`${file} : assets manquants`);
  for (const [, url] of assets) {
    if (!url.startsWith(`${base}assets/`)) errors.push(`${file} : asset hors base : ${url}`);
    else {
      try { await access(new URL(url.slice(base.length), dist)); }
      catch { errors.push(`${file} : asset introuvable : ${url}`); }
    }
  }
  console.log(`✓ ${file}`);
}
try { await access(new URL('.nojekyll', dist)); }
catch { errors.push('.nojekyll manquant'); }

if (errors.length) {
  console.error('AUDIT BUILD — ÉCHEC\n' + errors.map(error => `✗ ${error}`).join('\n'));
  process.exit(1);
}
console.log('AUDIT BUILD — OK : métadonnées statiques, accueil, routes, assets, robots, 404 sans canonical');
