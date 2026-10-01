# Anthologie numérique — Registre canonique des motions, animations, transitions et effets

**Version :** 2.0
**Date :** 1 octobre 2026
**Projet :** Anthologie numérique
**Périmètre :** interface publique, navigation, pages-œuvres, expériences interactives, CSS global et comportements JavaScript liés au mouvement.
**Statut :** source de vérité — implémentation finale validée.

---

## 1. Objet

Ce registre distingue cinq couches : motion éditorial, motion fonctionnel, motion sémantique, effets statiques et comportements JavaScript. Une animation n'est canonique que si elle aide à lire, agir ou comprendre une transformation.

Le shell éditorial doit rester plus calme que les œuvres. Les mouvements les plus complexes doivent rester dans les expériences interactives.

---

## 2. Principes canoniques

Le mouvement doit rester calme, précis, lisible et court lorsqu'il est fonctionnel. Il peut être plus lent lorsqu'il porte une intention éditoriale et spécifique lorsqu'il fait partie d'une œuvre.

Ne pas introduire d'autoplay, boucle décorative, parallax, bounce, spring exagéré, glitch continu, carousel automatique, drag/swipe sans justification éditoriale, transition globale incontrôlée ou animation indispensable à la compréhension sans équivalent statique.

Les six expériences peuvent conserver des timings locaux lorsque la durée elle-même porte le concept de l'œuvre.

---

## 3. Taxonomie

| Niveau | Nom | Fonction | Exemple |
|---|---|---|---|
| M0 | Static | aucun mouvement | Footer, pages légales |
| M1 | Micro feedback | confirmation | hover, flèche, couleur |
| M2 | Editorial reveal | entrée dans la lecture | Hero, Gallery, sections |
| M3 | Content transition | changement d'état | Memory, Recursive |
| M4 | Semantic transformation | le mouvement fait sens | Absence, Compression, Error |
| M5 | Navigation transition | passage entre couches/pages | dialogue œuvre |

---

## 4. Tokens Motion

Source : `src/app/lib/motion.ts`

```ts
editorialEase = [0.22, 1, 0.36, 1]
experimentEase = [0.2, 0.8, 0.2, 1]

motionTiming = {
  micro: 0.18,
  fast: 0.28,
  reveal: 0.55,
  standard: 0.6,
  deliberate: 0.7,
  slow: 0.9,
}
```

| Token | Durée | Usage |
|---|---:|---|
| `micro` | 180 ms | menu, feedback rapide |
| `fast` | 280 ms | dialogue, transition fonctionnelle |
| `reveal` | 550 ms | cartes et éléments secondaires |
| `standard` | 600 ms | reveal éditorial |
| `deliberate` | 700 ms | bloc secondaire important |
| `slow` | 900 ms | titre principal |

`editorialEase` est réservé au shell éditorial. `experimentEase` reste réservé aux transformations internes des œuvres.

---

## 5. Reduced motion

Source CSS : `src/styles/base.css`.

Le projet neutralise les transitions et animations via `prefers-reduced-motion: reduce`, remplace le scroll smooth par un scroll direct et limite les itérations.

Les composants Motion principaux utilisent également `useReducedMotion()`.

**Décision : KEEP.** La double protection CSS + React est volontaire.

---

# 6. Registre — Shell et navigation

## MOT-001 — Header entrance

- **Source :** `src/app/components/Header.tsx`
- **Élément :** `motion.header`
- **Niveau :** M2
- **Trigger :** montage
- **From :** `y: -72`
- **To :** `y: 0`
- **Durée :** `motionTiming.standard`
- **Easing :** `editorialEase`
- **Reduced motion :** aucun déplacement
- **Rôle :** introduire le shell éditorial
- **Décision :** KEEP — normalisé et tokenisé

## MOT-002 — Menu mobile open / close

- **Source :** `Header.tsx`
- **Élément :** `motion.nav`
- **Niveau :** M1 / M5
- **Trigger :** état `open`
- **Implémentation :** montage conditionnel via `AnimatePresence`
- **Open :** `opacity 0→1`, `y -6→0`
- **Close :** `opacity 1→0`, `y 0→-6`
- **Durée :** `motionTiming.micro`
- **Easing :** `editorialEase`
- **Mécanisme :** `AnimatePresence`
- **Décision :** KEEP — entrée et sortie symétriques

## MOT-003 — Skip link

- **Classe :** `-translate-y-24 transition-transform duration-200 focus:translate-y-0`
- **Niveau :** M1
- **Trigger :** focus clavier
- **Rôle :** rendre le lien d'évitement visible
- **Décision :** KEEP

## MOT-004 — Navigation desktop

- **Classe :** `transition-colors duration-300`
- **Niveau :** M1
- **Rôle :** feedback de navigation
- **Décision :** KEEP

## MOT-005 — Bouton menu mobile

- **Classe :** `transition-colors duration-300`
- **Niveau :** M1
- **Rôle :** feedback hover
- **Décision :** KEEP

---

# 7. Registre — Hero

## MOT-010 — Kicker

- **Source :** `HeroSection.tsx`
- **Niveau :** M2
- **From :** `opacity 0`, `y 18`
- **To :** `opacity 1`, `y 0`
- **Durée :** `standard`
- **Delay :** `0.12s`
- **Décision :** KEEP

## MOT-011 — Titre principal

- **From :** `opacity 0`, `y 28`
- **To :** `opacity 1`, `y 0`
- **Durée :** `slow`
- **Delay :** `0.20s`
- **Easing :** `editorialEase`
- **Rôle :** geste éditorial principal
- **Décision :** KEEP

## MOT-012 — Introduction

- **From :** `opacity 0`, `y 16`
- **To :** `opacity 1`, `y 0`
- **Durée :** `motionTiming.deliberate`
- **Delay :** `0.58s`
- **Décision :** KEEP — tokenisé

## MOT-013 — Layers TEXT / INTERFACE / BEHAVIOR

- **From :** `opacity 0`, `y 16`
- **To :** `opacity 1`, `y 0`
- **Durée :** `motionTiming.deliberate`
- **Delay :** `0.78s`
- **Décision :** KEEP — tokenisé

## MOT-014 — Panneau Index / principes

- **From :** `opacity 0`, `x 20`
- **To :** `opacity 1`, `x 0`
- **Durée :** `motionTiming.deliberate`
- **Delay :** `0.80s`
- **Décision :** KEEP — tokenisé

## MOT-015 — CTA Explorer

- **Classe :** `transition-transform group-hover:translate-x-1 group-hover:translate-y-1`
- **Niveau :** M1
- **Rôle :** direction ↘
- **Décision :** KEEP

---

# 8. Registre — Gallery

## MOT-020 — Reveal des cartes

- **Source :** `Gallery.tsx`
- **Élément :** `motion.article`
- **Niveau :** M2
- **Trigger :** `whileInView`
- **From :** `opacity 0`, `y 22`
- **To :** `opacity 1`, `y 0`
- **Durée :** `motionTiming.reveal`
- **Delay :** `index × 0.05s`, max `0.24s`
- **Viewport :** `once`, marge `-80px`
- **Easing :** `editorialEase`
- **Décision :** KEEP — easing explicite

## MOT-021 — Image hover

- **Classes :** `transition duration-700 group-hover:scale-[1.025] group-hover:opacity-72`
- **Niveau :** M1
- **From :** `scale 1`, `opacity .55`
- **To :** `scale 1.025`, `opacity .72`
- **Rôle :** rapprochement discret
- **Décision :** KEEP

## MOT-022 — Flèche de carte

- **Classe :** `transition` + changement border/couleur
- **Niveau :** M1
- **Décision :** KEEP

---

# 9. Registre — Observation

## MOT-030 — Reveal Observation

- **Source :** `ObservationSection.tsx`
- **Niveau :** M2
- **From :** `opacity 0`, `y 22`
- **To :** `opacity 1`, `y 0`
- **Implémentation :** transition explicite
- **Transition :** `motionTiming.standard + editorialEase`
- **Décision :** KEEP — normalisé

---

# 10. Registre — About section

## MOT-040 — Bloc gauche

- **From :** `opacity 0`, `y 18`
- **To :** `opacity 1`, `y 0`
- **Transition :** `motionTiming.standard + editorialEase`
- **Décision :** KEEP — normalisé

## MOT-041 — Statement droit

- **From :** `opacity 0`, `y 18`
- **To :** `opacity 1`, `y 0`
- **Delay :** `0.08s`
- **Transition :** `motionTiming.standard + editorialEase`
- **Décision :** KEEP — normalisé

## MOT-042 — Principes 01 / 02 / 03

- **From :** `opacity 0`, `x 18`
- **To :** `opacity 1`, `x 0`
- **Delay :** `index × 0.08s`
- **Durée :** `motionTiming.reveal`
- **Easing :** `editorialEase`
- **Décision :** KEEP — normalisé

## MOT-043 — CTA À propos

- **Classe :** `transition-transform` sur la flèche
- **Translation :** `x +0.5`, `y -0.5`
- **Décision :** KEEP

---

# 11. Registre — About page

## MOT-050 — Titre

- **From :** `opacity 0`, `y 18`
- **To :** `opacity 1`, `y 0`
- **Durée :** `standard`
- **Easing :** `editorialEase`
- **Décision :** KEEP

## MOT-051 — Contenu

- **From :** `opacity 0`, `y 18`
- **To :** `opacity 1`, `y 0`
- **Durée :** `0.65s`
- **Delay :** `0.08s`
- **Easing :** `editorialEase`
- **Décision :** KEEP — légère différence volontaire

## MOT-052 — Lien Portfolio

- **Implémentation :** `transition-[transform,color,letter-spacing] duration-300 ease-out`
- **Propriétés réellement animées :** transform, color, letter-spacing
- **Propriétés animées :** transform, color, letter-spacing
- **Décision :** KEEP — normalisé

---

# 12. Registre — Contact / Épilogue

## MOT-060 — Reveal

- **From :** `opacity 0`, `y 22`
- **To :** `opacity 1`, `y 0`
- **Implémentation :** transition explicite
- **Transition :** `motionTiming.standard + editorialEase`
- **Décision :** KEEP — normalisé

## MOT-061 — Retour au début

- **Classe :** `transition-transform`
- **Translation :** `x +1`, `y -1`
- **Décision :** KEEP

---

# 13. Footer, Legal, 404

## MOT-070 — Footer links

- **Classe :** `transition-colors duration-300`
- **Niveau :** M1
- **Décision :** KEEP

## MOT-071 — Pages légales

- **Niveau :** M0
- **Motion :** aucun
- **Décision :** KEEP — absence volontaire de mouvement

## MOT-072 — 404 arrow

- **Classe :** `transition-transform`
- **Translation :** `x +0.5`, `y -0.5`
- **Décision :** KEEP

---

# 14. Dialogue œuvre

## MOT-080 — Ouverture

- **Source :** `InteractiveArtPage.tsx`
- **Élément :** `motion.dialog`
- **Niveau :** M5
- **From :** `opacity 0`
- **To :** `opacity 1`
- **Durée :** `motionTiming.fast`
- **Décision :** KEEP — tokenisé

## MOT-081 — Fermeture

- **Implémentation :** sortie gérée par `AnimatePresence`
- **Sortie :** `opacity 1→0`, durée `motionTiming.fast`
- **Mécanisme :** `AnimatePresence`
- **Décision :** KEEP — entrée et sortie symétriques

## MOT-082 — Navigation précédent / suivant

- **Classes :** flèche gauche `translate-x -1`, flèche droite `translate-x +1`
- **Niveau :** M1
- **Décision :** KEEP

## MOT-083 — Changement d'œuvre

- **Actuel :** remplacement direct, scroll top instant, focus titre
- **Décision canonique :** KEEP DIRECT
- **Raison :** chaque étude est une page-œuvre ; ne pas transformer la collection en carousel

---

# 15. Expérience 01 — Syntaxe de l'absence

## EXP-ABS-001 — Instruction fade
- opacity ; `0.8s` ; trigger `completed`
- **Décision : KEEP**

## EXP-ABS-002 — Indicateurs de traces
- opacity + scaleX
- `0.45s` normal ; `1.0s` completed
- easing `experimentEase`
- **Décision : KEEP**

## EXP-ABS-003 — Composition vers résidu
- opacity ; `1.0s`
- **Décision : KEEP**

## EXP-ABS-004 — Numéro de fragment
- opacity ; `0.8s`
- **Décision : KEEP**

## EXP-ABS-005 — Fragment reveal / residue
- opacity + y
- `0.32s` revealed ; `0.65s` resting ; `1.1s` completed
- easing `experimentEase`
- **Décision : KEEP**

## EXP-ABS-006 — Ligne de fragment
- width + opacity
- `0.45s` normal ; `1.0s` completed
- **Décision : KEEP**

## EXP-ABS-007 — Message final
- opacity ; `1.1s`
- **Décision : KEEP**

---

# 16. Expérience 02 — Matrice de mémoire

## EXP-MEM-001 — Indicateurs
- opacity + scaleX ; `0.5s`; `experimentEase`
- **KEEP**

## EXP-MEM-002 — Note de mutation
- opacity ; `0.5s`
- **KEEP**

## EXP-MEM-003 — Traces historiques
- opacity + x + y ; `0.85s`
- rôle : stratification de la mémoire
- **KEEP**

## EXP-MEM-004 — Version courante
- `AnimatePresence mode="wait"`
- entrée : opacity 0→1, y -8→0
- sortie : opacity 1→.08, y 0→22
- durée `0.7s`, easing `experimentEase`
- **KEEP**

## EXP-MEM-005 — Conclusion
- opacity ; `1.0s`; delay `0.25s`
- **KEEP**

---

# 17. Expérience 03 — Lecture machine

## EXP-MACH-001 — Phrase lecteur
- opacity + y ; `0.55s`; `experimentEase`
- **KEEP**

## EXP-MACH-002 — Analyse système
- opacity ; `0.45s`
- **KEEP**

## EXP-MACH-003 — Reste non classé
- height `0↔auto` + opacity `0↔1`
- `0.55s`; `experimentEase`
- **KEEP**

---

# 18. Expérience 04 — Lettre récursive

## EXP-REC-001 — Indicateurs
- opacity + scaleX ; `0.4s`
- **KEEP**

## EXP-REC-002 — Trace précédente
- opacity + x + y ; `0.8s`
- **KEEP**

## EXP-REC-003 — Passage courant
- `AnimatePresence mode="wait"`
- entrée : opacity 0→1, x 10→0
- sortie : opacity 1→.08, x 0→-8
- `0.5s` cycle initial ; `0.75s` suivants
- `experimentEase`
- **KEEP**

## EXP-REC-004 — Note de boucle
- opacity ; `1.0s`
- **KEEP**

## EXP-REC-005 — État final
- opacity ; `1.1s`
- **KEEP**

---

# 19. Expérience 05 — Saison compressée

## EXP-COMP-001 — Courbe temporelle sémantique

```ts
[0.9, 0.78, 0.64, 0.5, 0.38, 0.28]
```

Chaque compression accélère. **Exception canonique : ne pas remplacer par les tokens généraux.**

## EXP-COMP-002 — Barre de matière
- width ; durée sémantique ; `experimentEase`
- **KEEP**

## EXP-COMP-003 — Annotation
- `AnimatePresence`; opacity ; `0.4s`
- **KEEP**

## EXP-COMP-004 — Cadre de compression
- width : `100 → 88 → 72 → 56 → 42 → 30%`
- **KEEP**

## EXP-COMP-005 — Texte compressé
- opacity + scaleX
- entrée `1.035→1`; sortie `1→.94`
- **KEEP**

## EXP-COMP-006 — Historique retiré
- opacity ; `0.7s`
- **KEEP**

## EXP-COMP-007 — Conclusion
- opacity ; `0.9s`; delay `0.15s`
- **KEEP**

---

# 20. Expérience 06 — Jardin d'erreurs

## EXP-ERR-001 — Indicateurs descendants
- opacity + scaleX ; `0.18s`
- **KEEP**

## EXP-ERR-002 — Perturbation
- opacity `.18→1`; x `±14→0`; y `±5→0`
- `0.18s`; `experimentEase`
- **KEEP**

## EXP-ERR-003 — Trace descendante
- opacity `0→1`; x `-7→0`; `0.28s`
- **KEEP**

## EXP-ERR-004 — Conclusion
- opacity ; `0.6s`
- **KEEP**

---

# 21. JavaScript lié au mouvement

## JS-001 — Smooth scroll
- **Sources :** `base.css`, `App.tsx`
- `scroll-behavior: smooth` + `scrollIntoView({ block: 'start' })`
- reduced motion : auto
- **KEEP**

## JS-002 — Migration `#a-propos`
- aucune animation
- **KEEP**

## JS-003 — Scroll lock du dialogue
- body `overflow: hidden`
- **KEEP**

## JS-004 — Focus management
- open → titre
- changement œuvre → titre + scroll top instant
- close → retour à l'opener
- **KEEP**

## JS-005 — Remount des expériences

```tsx
<ExperimentRenderer key={artwork.id} />
```

- réinitialise l'état au changement d'œuvre
- **KEEP**

---

# 22. Effets CSS nommés

## FX-001 — `.editorial-grid`
- **Source :** `src/styles/effects.css`
- **Attribution :** HeroSection, AboutSection
- pseudo-élément `::before`
- grille 120 × 120
- rôle : structure éditoriale / système
- animation : aucune
- **Décision : KEEP**

## FX-002 — `.digital-frame`
- **Attribution :** Gallery cards
- cadre intérieur via `::before`
- rôle : matérialiser la carte comme objet éditorial numérique
- **Décision : KEEP**

## FX-003 — `.data-label`
- ligne dorée + typographie mono
- rôle : voix système / index
- **Décision : KEEP**

## FX-004 — `.panel-soft`
- surface sombre très légèrement translucide
- border blanche faible
- aucun gradient
- aucun `backdrop-filter`
- aucun blur
- rôle : hiérarchiser le panneau Index du Hero sans produire de glassmorphism
- **Décision : KEEP — version V2A**

## FX-005 — `.section-light`
- **Attribution :** Gallery
- changement de registre clair
- **Décision : KEEP**

## FX-006 — `.section-gold`
- **Attribution :** Contact / Épilogue
- registre final doré
- **Décision : KEEP**

## FX-007 — `.micro-meta`
- attribution globale
- typographie mono, petite taille, uppercase, tracking
- rôle : voix métadonnée du système
- **Décision : KEEP — identitaire**

## FX-008 — `.discipline-writing-panel`
- registre TEXT
- surface plate
- border blanche faible
- bordure gauche rouge subtile
- aucune box-shadow
- aucun gradient
- **Décision : KEEP — version V2A**

## FX-009 — `.discipline-code-panel`
- registres INTERFACE / BEHAVIOR
- surface plate
- border blanche faible
- bordure gauche verte subtile
- aucune box-shadow
- aucun gradient
- **Décision : KEEP — version V2A**

## FX-010 — `.discipline-writing-text`
- `text-shadow: 0 0 18px rgba(198,82,74,0.055)`
- rôle : distinction sémantique écriture
- **Décision : KEEP**

## FX-011 — `.discipline-code-text`
- `text-shadow: 0 0 18px rgba(92,170,136,0.055)`
- rôle : distinction sémantique système / code
- **Décision : KEEP**

### Effets supprimés en V2A

Les classes suivantes ne font plus partie du système canonique :

- `.scan-overlay`
- `.digital-noise`
- `.discipline-dual`

Raisons : texture décorative non essentielle, bruit synthétique sans rôle fonctionnel et halos atmosphériques trop proches d'un langage UI décoratif.

---

# 23. Effets inline / traitements d'image

## FX-I-001 — Background global
- **Source :** `src/styles/base.css`
- `background: var(--bg)`
- aucun halo radial atmosphérique
- **Décision : KEEP — version V2B**

## FX-I-002 — Hero image treatment
- **Source :** `HeroSection.tsx`
- image `opacity-[0.24]`
- couleur originale conservée
- aucun grayscale
- voile neutre `bg-bg/60`
- aucun halo doré radial
- rôle : présence photographique subordonnée au contenu
- **Décision : KEEP — version V2B**

## FX-I-003 — Gallery image treatment
- **Source :** `Gallery.tsx`
- image `opacity-62`
- hover `scale-[1.02]`
- hover `opacity-76`
- gradient inférieur :
  `linear-gradient(180deg, rgba(5,5,5,.06) 0%, rgba(5,5,5,.26) 42%, rgba(5,5,5,.86) 100%)`
- aucun halo doré radial
- rôle du gradient : garantir la lisibilité des titres et métadonnées
- **Décision : KEEP — gradient fonctionnel**

## FX-I-004 — About background treatment
- **Source :** `AboutPage.tsx`
- deux voiles neutres plats :
  - `rgba(5,5,5,0.50)`
  - `rgba(5,5,5,0.10)`
- pas de gradient directionnel
- rôle : stabiliser la lisibilité sur photographie
- **Décision : KEEP — version V2B**

## FX-I-005 — WorkFigure treatment
- **Source :** `WorkFigure.tsx`
- image `opacity-88`
- gradient inférieur Tailwind :
  `bg-gradient-to-t from-black/72 via-black/[0.04] to-black/10`
- aucun halo doré radial
- rôle : lisibilité de la légende
- **Décision : KEEP — gradient fonctionnel**

---

# 24. Slider / carousel / slide

Aucun véritable slider ou carousel n'existe dans le projet.

Absents :

- track horizontal ;
- drag ;
- swipe ;
- autoplay ;
- scroll-snap ;
- pagination de carousel ;
- bibliothèque de slider.

Les seules translations de type « slide » sont des mouvements locaux : Header vertical, Hero panel horizontal, About principles horizontal, Memory vertical, Recursive horizontal, Error multidirectionnel et micro-translations des flèches.

**Décision canonique : ne pas introduire de carousel général.**

---

# 25. Normalisations réalisées

## NORM-001 — Timings centralisés
Les timings éditoriaux génériques sont définis dans `src/app/lib/motion.ts`.

**État : RESOLVED — commit `19804d9`.**

## NORM-002 — Easing explicite
Gallery, Observation, AboutSection, Contact et l'ensemble de la séquence Hero utilisent explicitement `editorialEase`.

**État : RESOLVED — commit `19804d9`.**

## NORM-003 — Defaults Motion implicites
Les reveals éditoriaux principaux ne dépendent plus des transitions Motion implicites.

**État : RESOLVED.**

## NORM-004 — Menu mobile
Ouverture et fermeture gérées par `AnimatePresence`, avec `motionTiming.micro`.

**État : RESOLVED.**

## NORM-005 — Dialogue œuvre
Ouverture et fermeture en fade, durée `motionTiming.fast`, avec conservation de la gestion native du dialogue et du focus.

**État : RESOLVED.**

## NORM-006 — `transition-all`
Le CTA Portfolio utilise une liste explicite de propriétés animées.

**État : RESOLVED.**

## NORM-007 — Effets structurels
Suppression de `scan-overlay`, `digital-noise`, `discipline-dual`, blur de `.panel-soft` et grosses box-shadows disciplinaires.

**État : RESOLVED — commit `83d2dc9`.**

## NORM-008 — Traitements d'image
Suppression des halos dorés décoratifs ; conservation uniquement des gradients nécessaires à la lisibilité.

**État : RESOLVED — commit `1e4a438`.**

---

# 26. Changements versionnés

## Motion V1

Commit :

```text
19804d9 Normalize editorial motion system
```

Périmètre principal :

- tokens Motion ;
- Header ;
- Hero ;
- Gallery ;
- Observation ;
- AboutSection ;
- AboutPage ;
- Contact ;
- InteractiveArtPage.

## Effects V2A

Commit :

```text
83d2dc9 Refine structural visual effects
```

Périmètre :

- suppression d'effets structurels décoratifs ;
- simplification de `.panel-soft` ;
- simplification des panels discipline ;
- conservation des accents sémantiques writing/code.

## Effects V2B

Commit :

```text
1e4a438 Refine image and overlay treatments
```

Périmètre :

- background global ;
- Hero image ;
- Gallery image ;
- About overlays ;
- WorkFigure.

## Effects V2C

Aucun patch supplémentaire requis.

L'audit final n'a identifié aucune classe d'effet morte ni aucun `backdrop-filter`, `blur()`, `box-shadow`, `mix-blend-mode`, `filter:` ou `transition-all` legacy.

---

# 27. Éléments explicitement préservés

Ne pas modifier sans nouvelle décision éditoriale :

- logique des six expériences ;
- timings sémantiques propres aux expériences ;
- séquences narratives ;
- Compression et sa courbe temporelle locale ;
- perturbation rapide de Error ;
- traces de Memory ;
- apparition/disparition de Absence ;
- navigation previous/next ;
- scroll top instant lors du changement d'œuvre ;
- focus management du dialogue ;
- structure des cartes ;
- structure du Hero ;
- pages légales ;
- Footer ;
- 404 ;
- reduced-motion double protection CSS + Motion.

---

# 28. Règles de contribution futures

Toute nouvelle animation ou tout nouvel effet doit préciser :

```text
NAME
TYPE
SOURCE FILE
COMPONENT / CLASS
TRIGGER
PROPERTY
FROM
TO
DURATION
DELAY
EASING
REDUCED MOTION
ROLE
SEMANTIC / FUNCTIONAL / DECORATIVE
STATE
```

Règles :

- une animation décorative sans rôle clair doit être refusée ;
- une animation fonctionnelle doit être courte et explicite ;
- une animation éditoriale doit utiliser les tokens canoniques ;
- une animation sémantique peut conserver des timings locaux documentés ;
- tout nouvel effet visuel doit distinguer lisibilité, structure et atmosphère ;
- les gradients nécessaires à la lisibilité sont admis ;
- les halos décoratifs, glass blur et effets d'ambiance gratuits ne font pas partie du canon actuel ;
- `transition-all` ne doit pas être utilisé lorsqu'une liste de propriétés peut être définie.

---

# 29. QA canonique

## Technique

```sh
npm run typecheck
npm run build
node scripts/audit-build.mjs
git diff --check
```

## Audit final du 1 octobre 2026

Résultat :

```text
typecheck            PASS
production build     PASS
postbuild             PASS
audit-build           PASS
git diff --check      PASS
legacy effect grep    PASS
```

Le build final transforme 2036 modules et génère les routes statiques attendues.

## Fonctionnel

Vérifier lors de toute modification ultérieure :

- Header ;
- menu mobile open/close ;
- Escape ;
- Hero ;
- Gallery ;
- Observation ;
- About ;
- Contact ;
- ouverture/fermeture œuvre ;
- focus après fermeture ;
- navigation previous/next ;
- reduced motion OS.

## Responsive

Contrôler au minimum :

```text
320
375
430
768
1024
1440
```

---

# 30. Canon final

```text
STATIC
↓
MICRO FEEDBACK
↓
EDITORIAL REVEAL
↓
CONTENT TRANSITION
↓
SEMANTIC TRANSFORMATION
```

La hiérarchie visuelle associée est :

```text
STRUCTURE
editorial-grid
digital-frame
section-light / section-gold

SURFACES
panel-soft
discipline-writing-panel
discipline-code-panel

IDENTITÉ
micro-meta
data-label
discipline-writing-text
discipline-code-text

IMAGE / LISIBILITÉ
Hero neutral veil
Gallery bottom gradient
About neutral veils
WorkFigure bottom gradient
```

Le shell éditorial reste calme. Les mouvements expressifs restent dans les œuvres. Les effets visuels servent désormais prioritairement la structure, la lisibilité ou une distinction sémantique.

> Une animation ou un effet n'est conservé que s'il aide à lire, à agir ou à comprendre ce qui se transforme.
