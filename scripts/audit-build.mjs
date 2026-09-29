import {
  access,
  readFile,
} from 'node:fs/promises';

const root =
  new URL(
    '../dist/',
    import.meta.url,
  );

const expectedFiles = [
  'index.html',
  'a-propos/index.html',
  'mentions-legales/index.html',
  'confidentialite/index.html',
  'conditions-utilisation/index.html',
  '404.html',
  '.nojekyll',
];

const errors = [];

for (const file of expectedFiles) {
  try {
    await access(
      new URL(
        file,
        root,
      ),
    );

    console.log(
      `✓ ${file}`,
    );
  } catch {
    errors.push(
      `Fichier manquant : ${file}`,
    );
  }
}

const pages = [
  {
    file:
      'a-propos/index.html',
    canonical:
      '/a-propos/',
  },
  {
    file:
      'mentions-legales/index.html',
    canonical:
      '/mentions-legales/',
  },
  {
    file:
      'confidentialite/index.html',
    canonical:
      '/confidentialite/',
  },
  {
    file:
      'conditions-utilisation/index.html',
    canonical:
      '/conditions-utilisation/',
  },
];

for (const page of pages) {
  const html =
    await readFile(
      new URL(
        page.file,
        root,
      ),
      'utf8',
    );

  if (
    !html.includes(
      '/anthologie-numerique/assets/',
    )
  ) {
    errors.push(
      `${page.file} : assets hors base GitHub Pages`,
    );
  }

  if (
    !html.includes(
      `https://framingcreativity.github.io/anthologie-numerique${page.canonical}`,
    )
  ) {
    errors.push(
      `${page.file} : canonical incorrect`,
    );
  }

  const expectedRobots =
    page.file ===
      'a-propos/index.html'
      ? 'index,follow'
      : 'noindex,nofollow';

  if (
    !html.includes(
      `name="robots" content="${expectedRobots}"`,
    )
  ) {
    errors.push(
      `${page.file} : robots ${expectedRobots} absent`,
    );
  }
}

const notFound =
  await readFile(
    new URL(
      '404.html',
      root,
    ),
    'utf8',
  );

if (
  !notFound.includes(
    'name="robots" content="noindex,nofollow"',
  )
) {
  errors.push(
    '404.html : noindex,nofollow absent',
  );
}

if (
  /rel=["']canonical["']/i.test(
    notFound,
  )
) {
  errors.push(
    '404.html : canonical interdit présent',
  );
}

if (
  !notFound.includes(
    '/anthologie-numerique/assets/',
  )
) {
  errors.push(
    '404.html : assets hors base GitHub Pages',
  );
}

const home =
  await readFile(
    new URL(
      'index.html',
      root,
    ),
    'utf8',
  );

const badAssetRefs = [
  ...home.matchAll(
    /(?:src|href)=["']\/assets\//g,
  ),
];

if (
  badAssetRefs.length > 0
) {
  errors.push(
    'index.html : référence /assets/ incompatible avec GitHub Pages',
  );
}

console.log();

if (errors.length) {
  console.error(
    'AUDIT BUILD — ÉCHEC',
  );

  for (const error of errors) {
    console.error(
      `✗ ${error}`,
    );
  }

  process.exit(1);
}

console.log(
  'AUDIT BUILD — OK',
);

console.log(
  '✓ routes statiques',
);

console.log(
  '✓ base assets',
);

console.log(
  '✓ canonicals',
);

console.log(
  '✓ robots',
);

console.log(
  '✓ 404 sans canonical',
);
