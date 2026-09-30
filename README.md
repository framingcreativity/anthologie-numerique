# Anthologie numérique

Anthologie numérique est une collection éditoriale et interactive composée de six études où le texte, l’image, l’interface et le code participent à une même expérience de lecture.

Le projet explore ce qui se produit lorsque le numérique ne sert plus seulement à afficher une œuvre, mais devient une partie active de sa forme : apparition, disparition, mémoire, interprétation, récursion, compression et erreur.

**Édition 01 — 2026**

**Direction artistique et publication : J-ART**

**Contact : j-art@framing-creativity.ch**

---

## 1. Présentation

Anthologie numérique est pensée comme une collection cohérente dont chaque œuvre invente cependant sa propre manière d’être une page numérique.

L’interface générale fournit un cadre éditorial commun : navigation, hiérarchie, typographie, palette, métadonnées et structure de lecture. À l’intérieur de ce cadre, chaque étude possède son propre comportement interactif.

Le projet ne cherche donc pas à reproduire un livre à l’écran. Il traite le navigateur, le temps, le geste, l’état de l’interface et la transformation comme des matériaux de lecture.

### Principe éditorial

> La collection partage une même édition, mais chaque œuvre invente sa propre manière d’être une page numérique.

Chaque étude suit un principe commun :

- une hypothèse ;
- une expérience ;
- une conséquence ;
- une interaction ;
- un résidu.

---

## 2. Les six études

| Nº | Étude | Axe | Médium | Comportement |
|---|---|---|---|---|
| 01 | **Syntaxe de l’absence** | Absence | Texte interactif | Révélation |
| 02 | **Matrice de mémoire** | Mémoire | Archive générative | Recomposition |
| 03 | **Lecture machine** | Interprétation | Essai visuel | Interprétation |
| 04 | **Lettre récursive** | Récursion | Narration récursive | Boucle / variation |
| 05 | **Saison compressée** | Compression | Poésie contrainte | Compression |
| 06 | **Jardin d’erreurs** | Erreur | Étude expérimentale | Erreur contrôlée |

### 01 — Syntaxe de l’absence

**Sous-titre :** Le vide comme instruction.

L’étude examine ce que le blanc, le silence et le retrait peuvent produire lorsqu’ils deviennent des éléments actifs de la lecture.

**Hypothèse :**

*Que peut dire ce qui n’est pas écrit ?*

### 02 — Matrice de mémoire

**Sous-titre :** Archives instables.

L’œuvre traite la mémoire comme une reconstruction : chaque reprise conserve quelque chose tout en déplaçant ce qui semblait stable.

**Hypothèse :**

*Un souvenir reste-t-il le même chaque fois qu’il revient ?*

### 03 — Lecture machine

**Sous-titre :** Quand le système interprète.

L’étude met en tension lecture humaine et classification machine. Les signes peuvent rester identiques tandis que leur interprétation change.

**Hypothèse :**

*Reconnaître une structure, est-ce déjà comprendre ?*

### 04 — Lettre récursive

**Sous-titre :** Un texte qui revient sur lui-même.

La répétition n’est pas traitée comme un simple retour, mais comme une transformation progressive : chaque boucle déplace légèrement son origine.

**Hypothèse :**

*Peut-on revenir au même texte sans revenir au même endroit ?*

### 05 — Saison compressée

**Sous-titre :** Poésie sous contrainte.

L’étude retire progressivement de la matière au texte afin d’observer ce qui demeure lorsque la phrase doit porter davantage avec moins de mots.

**Hypothèse :**

*Combien peut-on retirer avant de perdre la sensation ?*

### 06 — Jardin d’erreurs

**Sous-titre :** L’accident comme méthode.

L’erreur est laissée visible suffisamment longtemps pour révéler la règle, la structure ou l’attente qu’elle vient perturber.

**Hypothèse :**

*Que devient une règle lorsqu’une erreur la rend visible ?*

---

## 3. Architecture du site

Le projet utilise une architecture React légère, sans routeur externe.

La résolution des routes principales est gérée directement dans l’application. Les pages statiques nécessaires au référencement et à GitHub Pages sont produites au moment du build.

### Routes principales

| Route | Fonction | Indexation |
|---|---|---|
| `/` | Accueil et collection | `index,follow` |
| `/a-propos/` | Présentation du projet | `index,follow` |
| `/mentions-legales/` | Mentions légales | `noindex,nofollow` |
| `/confidentialite/` | Confidentialité | `noindex,nofollow` |
| `/conditions-utilisation/` | Conditions d’utilisation | `noindex,nofollow` |
| `404.html` | Page introuvable | `noindex,nofollow` |

L’accueil conserve également plusieurs ancres internes utilisées par la navigation éditoriale, notamment :

- `#fragments`
- `#pages`
- `#algorithmiques`
- `#contact`

L’ancien hash `#a-propos` est interprété côté client afin d’ouvrir la page `/a-propos/`. Il ne s’agit pas d’une redirection HTTP permanente.

---

## 4. Stack technique

Le projet repose sur une stack volontairement réduite.

| Technologie | Version / rôle |
|---|---|
| React | 18.3.1 |
| React DOM | 18.3.1 |
| TypeScript | 7.x |
| Vite | 6.4.x |
| Tailwind CSS | 4.1.12 |
| Motion | 12.23.24 |
| Lucide React | 0.487.0 |
| Node.js | 24 pour GitHub Actions |
| npm | Gestion des dépendances et scripts |

Le projet ne dépend pas d’un framework applicatif complet ni d’un routeur React externe.

---

## 5. Structure du dépôt

```text
anthologie-numerique/
├── .github/
│   └── workflows/
│       └── pages.yml
├── scripts/
│   ├── audit-build.mjs
│   └── postbuild.mjs
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── work/
│   │   │   │   ├── experiments/
│   │   │   │   ├── ExperimentRenderer.tsx
│   │   │   │   ├── InteractiveArtPage.tsx
│   │   │   │   ├── WorkFigure.tsx
│   │   │   │   ├── WorkNavigation.tsx
│   │   │   │   └── WorkResidue.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Gallery.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── LegalPage.tsx
│   │   │   ├── NotFoundPage.tsx
│   │   │   ├── ObservationSection.tsx
│   │   │   └── PageMeta.tsx
│   │   ├── data/
│   │   │   ├── artworks.ts
│   │   │   └── pages.json
│   │   ├── lib/
│   │   │   ├── motion.ts
│   │   │   └── site.ts
│   │   └── App.tsx
│   ├── assets/
│   │   └── anthologie/
│   ├── styles/
│   │   ├── base.css
│   │   ├── effects.css
│   │   ├── index.css
│   │   └── tokens.css
│   └── main.tsx
├── ATTRIBUTIONS.md
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

---

## 6. Organisation du code

### `src/app/App.tsx`

Point principal de composition de l’application.

Il :

- détermine la route active ;
- compose la page d’accueil ;
- charge les pages secondaires ;
- conserve la logique de navigation générale sans routeur tiers.

### `src/app/data/artworks.ts`

Source de vérité du corpus des six études.

Chaque œuvre contient notamment :

- identifiant ;
- chapitre ;
- titre ;
- sous-titre ;
- aperçu ;
- hypothèse ;
- texte principal ;
- conséquence ;
- résidu ;
- note d’interaction ;
- fragments ;
- médium ;
- comportement ;
- type d’expérience ;
- image associée.

### `src/app/data/pages.json`

Source de vérité des pages publiques et de leurs métadonnées.

Le fichier définit notamment :

- l’URL du site ;
- le `basePath` ;
- les routes ;
- les titres ;
- les descriptions ;
- les directives `robots`.

### `src/app/components/work/`

Contient l’architecture de lecture des œuvres.

`InteractiveArtPage.tsx` constitue la couche principale de consultation détaillée. Les différentes expériences sont rendues par `ExperimentRenderer.tsx` et leurs composants spécialisés.

### `src/app/components/work/experiments/`

Contient les six comportements interactifs :

- absence ;
- mémoire ;
- lecture machine ;
- récursion ;
- compression ;
- erreur.

Chaque expérience conserve sa propre logique et n’est pas réduite à un composant générique unique.

### `src/styles/`

La couche CSS est divisée entre :

- `tokens.css` — variables et tokens visuels ;
- `base.css` — règles globales et fondations ;
- `effects.css` — effets et comportements visuels ;
- `index.css` — point d’entrée CSS.

---

## 7. Installation locale

### Prérequis

Recommandé :

- Node.js 24 ;
- npm ;
- Git.

### Installation

```sh
git clone https://github.com/framingcreativity/anthologie-numerique.git
cd anthologie-numerique
npm ci
```

`npm ci` doit être privilégié afin de respecter exactement les versions enregistrées dans `package-lock.json`.

---

## 8. Développement

Démarrer le serveur local :

```sh
npm run dev
```

Vite affiche ensuite l’URL locale, généralement :

```text
http://localhost:5173/
```

Si ce port est déjà utilisé, Vite sélectionne automatiquement le suivant.

En développement, la base utilisée par Vite est `/`.

---

## 9. Scripts disponibles

### Développement

```sh
npm run dev
```

Lance Vite en mode développement.

### Validation TypeScript

```sh
npm run typecheck
```

Exécute :

```sh
tsc --noEmit
```

Aucun fichier JavaScript n’est produit par cette commande.

### Build de production

```sh
npm run build
```

Le build exécute successivement :

```text
TypeScript validation
→ Vite build
→ génération statique post-build
```

La commande définie dans `package.json` est :

```sh
npm run typecheck && vite build && node scripts/postbuild.mjs
```

### Audit du build

```sh
node scripts/audit-build.mjs
```

L’audit vérifie notamment :

- l’existence des documents HTML attendus ;
- les titres ;
- les descriptions ;
- les directives `robots` ;
- les balises Open Graph ;
- les URL canoniques ;
- l’absence de canonical sur la 404 ;
- la présence des assets ;
- le respect du `basePath` ;
- la présence de `.nojekyll`.

### Aperçu de production

```sh
npm run preview
```

Permet de vérifier localement le contenu de `dist/`.

### Audit npm

```sh
npm audit
```

À exécuter avant une publication ou une mise à jour importante des dépendances.

---

## 10. Build statique et métadonnées

Le site reste une application React interactive, mais plusieurs documents HTML sont générés après le build afin que chaque route possède ses propres métadonnées statiques.

### `scripts/postbuild.mjs`

Le script :

1. lit `src/app/data/pages.json` ;
2. reprend le document `dist/index.html` produit par Vite ;
3. retire les métadonnées génériques gérées par le projet ;
4. génère les métadonnées propres à chaque page ;
5. crée les documents HTML correspondant aux routes ;
6. produit `404.html` ;
7. crée `.nojekyll`.

Les documents générés incluent notamment :

```text
dist/index.html
dist/a-propos/index.html
dist/mentions-legales/index.html
dist/confidentialite/index.html
dist/conditions-utilisation/index.html
dist/404.html
dist/.nojekyll
```

### Métadonnées côté client

`PageMeta.tsx` maintient également les métadonnées lors des changements de page côté client :

- `title`
- `description`
- `robots`
- `og:title`
- `og:description`
- `og:type`
- `og:url`
- canonical

La configuration de `pages.json` évite de multiplier les sources de vérité.

---

## 11. Configuration des URL

La configuration par défaut est actuellement :

```text
Base de production :
/anthologie-numerique/

URL canonique :
https://framingcreativity.github.io/anthologie-numerique
```

### Variables disponibles

#### `VITE_BASE_PATH`

Définit la base depuis laquelle les assets et routes sont servis.

Exemple :

```env
VITE_BASE_PATH=/anthologie-numerique/
```

Pour une publication directement à la racine d’un domaine :

```env
VITE_BASE_PATH=/
```

#### `VITE_SITE_URL`

Définit l’URL publique complète servant notamment à produire les URL canoniques.

Exemple :

```env
VITE_SITE_URL=https://example.org
```

Pour éviter les incohérences, `VITE_BASE_PATH` et `VITE_SITE_URL` doivent correspondre au même environnement de publication lors du build et de l’audit.

---

## 12. Assets

Les assets du projet sont conservés localement.

### Images principales

Les images du projet se trouvent dans :

```text
src/assets/anthologie/
```

Le corpus comprend notamment :

- `syntaxe-absence.jpg`
- `matrice-memoire.jpg`
- `lecture-machine.jpg`
- `lettre-recursive.jpg`
- `saison-compressee.jpg`
- `jardin-erreurs.jpg`
- `hero-anthologie-numerique.webp`
- `about-experience.webp`

Les versions WebP optimisées sont utilisées lorsque cela est pertinent pour réduire le poids servi.

Aucun CDN d’images n’est requis par l’architecture actuelle.

### Chargement

Les images de contenu non prioritaires peuvent être chargées paresseusement.

Le Hero reste prioritaire afin de réduire le délai d’affichage du premier écran.

Les images purement décoratives utilisent une alternative textuelle vide lorsque cela est approprié.

---

## 13. Design et système visuel

La direction artistique repose sur un langage éditorial volontairement sobre.

Principes principaux :

- contraste entre fonds sombres et surfaces éditoriales claires ;
- usage limité de l’or comme accent ;
- composition typographique forte ;
- géométrie nette ;
- hiérarchie éditoriale avant décoration ;
- transitions discrètes ;
- absence d’effets UI génériques de type dashboard ou SaaS ;
- interactions spécifiques aux œuvres plutôt qu’animations décoratives continues.

Les tokens visuels sont centralisés dans `src/styles/tokens.css`.

---

## 14. Accessibilité

Le projet intègre plusieurs mesures destinées à améliorer l’accessibilité, sans constituer pour autant une certification formelle WCAG.

Parmi les mesures actuellement intégrées :

- contrastes renforcés pour les textes secondaires ;
- hiérarchie sémantique des titres ;
- gestion des états de focus ;
- dialogue natif pour la consultation détaillée des œuvres ;
- retour du focus lors de la fermeture du dialogue ;
- prise en compte de `prefers-reduced-motion` ;
- réduction ou suppression des transitions lorsque l’utilisateur demande moins de mouvement ;
- structure responsive ;
- alternatives vides pour les images strictement décoratives ;
- navigation utilisable au clavier dans les principaux parcours interactifs.

L’accessibilité doit continuer à être vérifiée visuellement et fonctionnellement lors de toute modification majeure.

---

## 15. Motion

Motion est utilisé pour accompagner la lecture et non pour produire une animation permanente.

Les composants respectent `prefers-reduced-motion` via `useReducedMotion`.

Lorsqu’une réduction du mouvement est demandée :

- les animations d’entrée sont supprimées ou fortement réduites ;
- les délais inutiles sont évités ;
- les interactions essentielles restent disponibles.

---

## 16. Pages légales et confidentialité

Le projet comprend trois pages dédiées :

```text
/mentions-legales/
/confidentialite/
/conditions-utilisation/
```

### Responsable de publication

**J-ART**

### Contact

**j-art@framing-creativity.ch**

### Hébergement

Le site est prévu pour être hébergé au moyen de **GitHub Pages**, service fourni par **GitHub, Inc.**

Les mentions légales et la politique de confidentialité décrivent également le rôle de l’hébergeur et les traitements techniques qui relèvent de ce service.

Ces pages sont actuellement configurées en :

```text
noindex,nofollow
```

Leur contenu doit rester cohérent avec l’infrastructure réellement utilisée lors de toute évolution du projet.

---

## 17. Déploiement GitHub Pages

Le workflow de déploiement se trouve dans :

```text
.github/workflows/pages.yml
```

Le déploiement est volontairement **manuel**.

Le workflow utilise uniquement :

```yaml
on:
  workflow_dispatch:
```

Un simple `git push` sur `main` ne déclenche donc pas automatiquement une publication GitHub Pages.

### Pipeline Pages

Lorsque le workflow est lancé manuellement, il :

1. récupère le dépôt ;
2. configure Node.js 24 ;
3. installe les dépendances avec `npm ci` ;
4. configure GitHub Pages ;
5. exécute `npm run build` ;
6. exécute `node scripts/audit-build.mjs` ;
7. téléverse `dist/` comme artifact Pages ;
8. déploie l’artifact vers l’environnement `github-pages`.

Cette séparation permet de synchroniser le code du dépôt sans publier automatiquement une nouvelle version du site.

---

## 18. Validation avant publication

Avant une publication, exécuter au minimum :

```sh
npm run build
node scripts/audit-build.mjs
npm audit
git diff --check
git status -sb
```

Un état attendu avant déploiement doit présenter :

- TypeScript sans erreur ;
- build Vite réussi ;
- audit statique réussi ;
- aucun asset manquant ;
- aucune vulnérabilité npm connue au moment du contrôle ;
- aucun problème de whitespace Git ;
- working tree propre ;
- métadonnées et routes cohérentes avec l’environnement de publication.

Une vérification visuelle reste nécessaire sur plusieurs largeurs d’écran.

Largeurs utiles pour le QA :

```text
320 px
375 px
430 px
768 px
1024 px
1440 px
```

Le build automatique ne remplace pas ce contrôle visuel.

---

## 19. Attributions

Les informations relatives aux bibliothèques, dépendances et éléments tiers sont documentées dans :

```text
ATTRIBUTIONS.md
```

Ce document doit être consulté avant toute modification de la provenance, du statut ou de la licence d’un asset.

---

## 20. Droits

© 2026 J-ART. Tous droits réservés.

Les contenus originaux, textes, images, compositions, interfaces, concepts éditoriaux, expériences interactives et éléments graphiques du projet restent protégés par les droits applicables.

Ce dépôt n’est pas distribué sous licence open source.

Les licences applicables aux dépendances tierces restent celles de leurs auteurs respectifs et ne constituent pas une licence accordée sur les œuvres ou le contenu original d’Anthologie numérique.

---

## 21. Contact

**J-ART**

Responsable de publication

**Email :** j-art@framing-creativity.ch

---

## 22. Résumé

Anthologie numérique est à la fois :

- une collection de six œuvres numériques ;
- une expérience éditoriale interactive ;
- un laboratoire de lecture ;
- un projet React/Vite statiquement publiable ;
- une recherche sur la relation entre texte, interface et comportement.

La cohérence générale du projet repose sur une règle simple :

> Le numérique ne doit pas seulement contenir l’œuvre. Il doit participer à la manière dont elle se lit.
