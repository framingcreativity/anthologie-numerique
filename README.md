Anthologie numérique
Anthologie numérique est une collection éditoriale et interactive composée de six études où le texte, l’image, l’interface et le code participent à une même expérience de lecture.
Le projet explore ce qui se produit lorsque le numérique ne sert plus seulement à afficher une œuvre, mais devient une partie active de sa forme : apparition, disparition, mémoire, interprétation, récursion, compression et erreur.
Édition 01 — 2026
Direction artistique et publication : J-ART
Site public :
https://framingcreativity.github.io/anthologie-numerique/
1. Présentation
Anthologie numérique est pensée comme une collection cohérente dont chaque œuvre invente sa propre manière d’être une page numérique.
L’interface générale fournit un cadre éditorial commun — navigation, hiérarchie, typographie, palette et structure de lecture — tandis que chaque étude développe son propre comportement interactif.
Le projet ne cherche pas à reproduire un livre à l’écran. Il traite le navigateur, le temps, le geste, l’état de l’interface et la transformation comme des matériaux de lecture.
Principe éditorial
La collection partage une même édition, mais chaque œuvre invente sa propre manière d’être une page numérique.

Chaque étude articule une hypothèse, une expérience, une conséquence, une interaction et un résidu.
2. Les six études
Nº	Étude	Axe	Médium	Comportement
01	Syntaxe de l’absence	Absence	Texte interactif	Révélation
02	Matrice de mémoire	Mémoire	Archive générative	Recomposition
03	Lecture machine	Interprétation	Essai visuel	Interprétation
04	Lettre récursive	Récursion	Narration récursive	Boucle / variation
05	Saison compressée	Compression	Poésie contrainte	Compression
06	Jardin d’erreurs	Erreur	Étude expérimentale	Erreur contrôlée


Chaque étude possède sa propre logique de lecture et son propre comportement interactif. L’expérience complète est accessible sur le site public.
3. Aperçu technique
Le projet repose sur une architecture React légère, sans routeur externe.
Les routes publiques sont résolues directement dans l’application, tandis que les documents HTML nécessaires aux métadonnées, au référencement et à GitHub Pages sont générés au moment du build.
Stack
Technologie	Rôle
React 18.3.1	Interface
React DOM 18.3.1	Rendu
TypeScript 7.x	Typage
Vite 6.4.x	Développement et build
Tailwind CSS 4.1.12	Utilitaires de style
Motion 12.23.24	Mouvement éditorial
Lucide React 0.487.0	Icônes
npm	Dépendances et scripts


Le workflow GitHub Pages utilise Node.js 24.
4. Structure du projet
anthologie-numerique/
├── .github/
│   └── workflows/
│       └── pages.yml
├── docs/
│   └── motion-effects-canonical-registry.md
├── scripts/
│   ├── audit-build.mjs
│   └── postbuild.mjs
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── work/
│   │   │       └── experiments/
│   │   ├── data/
│   │   ├── lib/
│   │   └── App.tsx
│   ├── assets/
│   │   └── anthologie/
│   ├── styles/
│   └── main.tsx
├── ATTRIBUTIONS.md
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
Sources principales
- src/app/data/artworks.ts — corpus des six études ;
- src/app/data/pages.json — routes, métadonnées et configuration publique ;
- src/app/components/work/ — architecture de lecture des œuvres ;
- src/app/components/work/experiments/ — comportements interactifs spécifiques ;
- src/styles/tokens.css — tokens visuels ;
- src/styles/effects.css — effets structurels et visuels ;
- src/app/lib/motion.ts — timings et easing éditoriaux ;
- docs/motion-effects-canonical-registry.md — registre canonique Motion & Effects.
5. Installation locale
Prérequis
Pour reproduire au plus près l’environnement de production :
- Node.js 24 ;
- npm ;
- Git.
Installation
git clone https://github.com/framingcreativity/anthologie-numerique.git
cd anthologie-numerique
npm ci
npm ci est recommandé afin de respecter les versions enregistrées dans package-lock.json.
6. Développement et build
Développement
npm run dev
Vite démarre le serveur local, généralement sur :
http://localhost:5173/
Validation TypeScript
npm run typecheck
Build de production
npm run build
Le build exécute :
TypeScript
→ Vite
→ génération statique post-build
Audit du build
node scripts/audit-build.mjs
L’audit vérifie notamment :
- les documents HTML attendus ;
- les titres et descriptions ;
- les directives robots ;
- les balises Open Graph ;
- les URL canoniques ;
- la 404 ;
- les assets ;
- le basePath ;
- .nojekyll.
Aperçu de production
npm run preview
7. Design, mouvement et accessibilité
La direction artistique repose sur un langage éditorial sobre : contraste fort, géométrie nette, usage limité de l’or, composition typographique et interactions spécifiques aux œuvres.
Le système évite volontairement :
- les effets UI génériques de type dashboard ou SaaS ;
- le glassmorphism ;
- les halos décoratifs sans rôle clair ;
- les animations continues non nécessaires.
Les mouvements éditoriaux utilisent des timings centralisés et respectent prefers-reduced-motion.
Le projet intègre également :
- gestion des états de focus ;
- dialogue natif pour la consultation détaillée ;
- retour du focus à la fermeture ;
- hiérarchie sémantique des titres ;
- navigation clavier sur les parcours principaux ;
- alternatives vides pour les images strictement décoratives.
Ces mesures améliorent l’accessibilité sans constituer une certification formelle WCAG.
Pour le détail du système Motion & Effects :
docs/motion-effects-canonical-registry.md
8. Déploiement
Le site est hébergé sur GitHub Pages.
Le workflow se trouve dans :
.github/workflows/pages.yml
Le déploiement est volontairement manuel via :
on:
  workflow_dispatch:
Un simple git push sur main ne publie donc pas automatiquement une nouvelle version du site.
Le pipeline :
Checkout
→ Setup Node
→ Setup Pages
→ npm ci
→ build
→ audit
→ upload de l’artifact
→ déploiement GitHub Pages
9. Validation avant publication
Avant un déploiement :
npm run build
node scripts/audit-build.mjs
npm audit
git diff --check
git status -sb
Les vulnérabilités signalées par npm audit doivent être examinées avant publication. Un audit automatique ne remplace pas une décision de sécurité contextualisée.
Une vérification visuelle reste également nécessaire sur plusieurs tailles d’écran.
10. Documentation complémentaire
Motion & Effects
docs/motion-effects-canonical-registry.md
Source canonique des animations, transitions, effets visuels, timings et règles de contribution associées.
Attributions
ATTRIBUTIONS.md
Documente les bibliothèques, dépendances et éléments tiers utilisés par le projet.
11. Pages légales et confidentialité
Le projet comprend :
/mentions-legales/
/confidentialite/
/conditions-utilisation/
Le site est hébergé sur GitHub Pages, service fourni par GitHub, Inc.
Ces pages sont configurées en :
noindex,nofollow
Responsable de publication
J-ART
Contact
j-art@framing-creativity.ch
12. Droits
© 2026 J-ART. Tous droits réservés.
Les contenus originaux, textes, images, compositions, interfaces, concepts éditoriaux, expériences interactives et éléments graphiques du projet restent protégés par les droits applicables.
Ce dépôt n’est pas distribué sous licence open source.
Les licences applicables aux dépendances tierces restent celles de leurs auteurs respectifs et ne constituent pas une licence accordée sur les œuvres ou le contenu original d’Anthologie numérique.
Contact
J-ART
Responsable de publication
j-art@framing-creativity.ch
Le numérique ne doit pas seulement contenir l’œuvre. Il doit participer à la manière dont elle se lit.
