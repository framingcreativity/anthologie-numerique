import {
  cp,
  mkdir,
  readFile,
  writeFile,
} from 'node:fs/promises';

import {
  join,
} from 'node:path';

const dist =
  new URL(
    '../dist/',
    import.meta.url,
  );

const sourcePath =
  new URL(
    'index.html',
    dist,
  );

const source =
  await readFile(
    sourcePath,
    'utf8',
  );

const siteUrl =
  (
    process.env.VITE_SITE_URL ||
    'https://framingcreativity.github.io/anthologie-numerique'
  ).replace(/\/+$/, '');

const routes = [
  {
    path: 'a-propos',
    title:
      'À propos — Anthologie numérique',
    description:
      'Pourquoi Anthologie numérique existe : une pratique où texte, image, interaction et mouvement deviennent une seule forme de lecture.',
    robots:
      'index,follow',
  },
  {
    path: 'mentions-legales',
    title:
      'Mentions légales — Anthologie numérique',
    description:
      'Informations relatives à l’édition, à l’hébergement et aux droits associés à Anthologie numérique.',
    robots:
      'noindex,nofollow',
  },
  {
    path: 'confidentialite',
    title:
      'Confidentialité — Anthologie numérique',
    description:
      'Informations relatives à la confidentialité et au traitement des données techniques sur Anthologie numérique.',
    robots:
      'noindex,nofollow',
  },
  {
    path: 'conditions-utilisation',
    title:
      'Conditions d’utilisation — Anthologie numérique',
    description:
      'Conditions d’accès et d’utilisation du projet éditorial et artistique Anthologie numérique.',
    robots:
      'noindex,nofollow',
  },
];

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

for (const route of routes) {
  const directory =
    new URL(
      `${route.path}/`,
      dist,
    );

  await mkdir(
    directory,
    {
      recursive: true,
    },
  );

  const canonical =
    `${siteUrl}/${route.path}/`;

  await writeFile(
    new URL(
      'index.html',
      directory,
    ),
    buildHtml({
      title:
        route.title,
      description:
        route.description,
      canonical,
      robots:
        route.robots,
    }),
    'utf8',
  );
}

await writeFile(
  new URL(
    '404.html',
    dist,
  ),
  buildHtml({
    title:
      'Page introuvable — Anthologie numérique',
    description:
      'La page demandée n’existe pas ou n’est plus disponible.',
    canonical:
      null,
    robots:
      'noindex,nofollow',
  }),
  'utf8',
);

await writeFile(
  new URL(
    '.nojekyll',
    dist,
  ),
  '',
  'utf8',
);

console.log(
  '✓ Routes statiques générées',
);
console.log(
  '✓ 404.html généré sans canonical',
);
console.log(
  '✓ .nojekyll généré',
);
