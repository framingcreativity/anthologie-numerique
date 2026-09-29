import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const config = JSON.parse(await readFile(new URL('../src/app/data/pages.json', import.meta.url), 'utf8'));
const env = loadEnv('production', fileURLToPath(new URL('../', import.meta.url)), 'VITE_');
const dist = new URL('../dist/', import.meta.url);
const source = await readFile(new URL('index.html', dist), 'utf8');
const siteUrl = (env.VITE_SITE_URL || config.siteUrl).replace(/\/+$/, '');

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function withoutManagedMeta(html) {
  return html
    .replace(
      /<title>[\s\S]*?<\/title>/i,
      '',
    )
    .replace(
      /<meta\s+name=["']description["'][^>]*>/gi,
      '',
    )
    .replace(
      /<meta\s+name=["']robots["'][^>]*>/gi,
      '',
    )
    .replace(
      /<meta\s+property=["']og:title["'][^>]*>/gi,
      '',
    )
    .replace(
      /<meta\s+property=["']og:description["'][^>]*>/gi,
      '',
    )
    .replace(
      /<meta\s+property=["']og:type["'][^>]*>/gi,
      '',
    )
    .replace(
      /<meta\s+property=["']og:url["'][^>]*>/gi,
      '',
    )
    .replace(
      /<link\s+rel=["']canonical["'][^>]*>/gi,
      '',
    );
}

function buildHtml({
  title,
  description,
  canonical,
  robots,
}) {
  const clean =
    withoutManagedMeta(
      source,
    );

  const meta = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${escapeHtml(robots)}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:type" content="website" />`,
  ];

  if (canonical) {
    meta.push(
      `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
      `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    );
  }

  return clean.replace(
    '</head>',
    `${meta.join('\n    ')}\n  </head>`,
  );
}

for (const [key, page] of Object.entries(config.pages)) {
  const file = key === '404' ? '404.html' : `${page.path.slice(1)}index.html`;
  const destination = new URL(file, dist);
  await mkdir(new URL('.', destination), { recursive: true });
  await writeFile(destination, buildHtml({
    ...page,
    canonical: page.path ? `${siteUrl}${page.path}` : null,
  }), 'utf8');
}

await writeFile(new URL('.nojekyll', dist), '', 'utf8');
console.log('✓ Accueil et routes statiques avec métadonnées ; 404 sans canonical ; .nojekyll');
