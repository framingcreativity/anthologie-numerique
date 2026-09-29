# Anthologie numérique

Une collection de six études où le texte, l’image, l’interface et le code participent à une même expérience de lecture : absence, mémoire, interprétation, récursion, compression et erreur contrôlée.

## Développement

Node.js 24 et npm (versions des dépendances verrouillées dans `package-lock.json`).

```sh
npm ci
npm run dev
npm run build
node scripts/audit-build.mjs
npm run preview
```

Le build génère `dist/`, exclu de Git. L’audit vérifie les métadonnées statiques de chaque route, les chemins et fichiers des assets, les directives robots et la 404 sans canonical.

## Stack et architecture

React 18, TypeScript/TSX compilé par Vite 6, Tailwind CSS 4, Motion et Lucide. Aucun routeur externe.

- `src/app/App.tsx` : résolution des routes et composition de l’accueil.
- `src/app/lib/site.ts` : chemins sous une base Vite et URL canoniques.
- `src/app/data/pages.json` : configuration par défaut et métadonnées communes au client et au build statique.
- `src/app/data/artworks.ts` : corpus et métadonnées des six œuvres.
- `src/app/components/work/` : dialogue natif, lecture et navigation ; chaque expérience conserve son composant et son état, chargés à la demande.
- `src/styles/index.css` : unique entrée CSS ; tokens, base et effets éditoriaux séparés.
- `scripts/postbuild.mjs` : production des documents HTML statiques avec métadonnées. Le contenu interactif est rendu par React.

## Routes

`/`, `/a-propos/`, `/mentions-legales/`, `/confidentialite/`, `/conditions-utilisation/` et `404.html`.

L’accueil conserve `#fragments`, `#pages`, `#algorithmiques` et `#contact`. L’ancien lien `#a-propos` effectue une navigation côté client vers `/a-propos/` ; ce n’est pas une redirection HTTP 301.

## Assets

Les images locales portent des noms descriptifs dans `src/assets/anthologie/`. Les PNG Hero et À propos sont les sources conservées ; leurs WebP sans perte sont les versions servies. Les six JPEG du corpus restent les images canoniques des études. Aucun CDN d’images. Les images décoratives ont une alternative vide ; les cartes sont chargées paresseusement, le Hero est prioritaire.

Voir `ATTRIBUTIONS.md` pour les dépendances et les limites de la provenance photographique disponible.

## Publication

Le projet reste privé. Le workflow Pages ne se déclenche que manuellement (`workflow_dispatch`). Ne pas activer Pages ni déclencher ce workflow avant l’approbation de publication et la finalisation des informations légales.

Base de production par défaut : `/anthologie-numerique/`. URL canonique par défaut : `https://framingcreativity.github.io/anthologie-numerique`. Le serveur de développement utilise `/`.

`VITE_BASE_PATH` configure la base des fichiers servis ; `VITE_SITE_URL` configure l’URL complète du site, base comprise. Ces variables peuvent être fournies par l’environnement ou `.env.production`. Utiliser les mêmes valeurs pour le build et l’audit. Pour une publication à la racine, configurer explicitement `VITE_BASE_PATH=/` et l’URL approuvée dans `VITE_SITE_URL`.

Les trois pages légales restent `noindex,nofollow` en attendant leur validation. La 404 est également non indexable et sans URL canonique. Aucun domaine de production supplémentaire ni image sociale n’est présumé.

## Droits

© 2026 J-ART. Tous droits réservés sur les contenus originaux et le code du projet, sauf éléments tiers soumis à leurs licences respectives. Ce dépôt n’est pas proposé sous licence open source. Les licences des dépendances ne constituent pas une licence sur les œuvres.
