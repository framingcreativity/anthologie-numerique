import imageA from 'figma:asset/07cb64d44f0ca7aa76b810053cdee15b1ec48375.png';
import imageB from 'figma:asset/b26d3432409095bed228b39abf9f8c845d4cd506.png';
import imageC from 'figma:asset/825c75d9988a36f04b9b0bc6f314908d70085d98.png';

export type ExperienceType =
  | 'absence'
  | 'memory'
  | 'machine'
  | 'recursion'
  | 'compression'
  | 'error';

export type Artwork = {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  preview: string;
  hypothesis: string;
  mainText: string;
  consequence: string;
  interactionNote: string;
  fragments: string[];
  medium: string;
  behavior: string;
  experience: ExperienceType;
  image: string;
};

export const artworks: Artwork[] = [
  {
    id: 'syntax-of-absence',
    chapter: 'Absence',
    title: 'Syntaxe de l’absence',
    subtitle: 'Le vide comme instruction',
    preview:
      'Une lecture où ce qui manque agit autant que ce qui demeure.',
    hypothesis:
      'Une absence peut-elle produire autant de sens qu’une phrase ?',
    mainText:
      'La page devient une architecture de silences. Certains fragments apparaissent, d’autres restent hors champ. L’espace ne sépare plus le texte : il participe à sa syntaxe.',
    consequence:
      'Lire revient aussi à interpréter ce qui manque.',
    interactionNote:
      'Approcher, choisir, révéler. Chaque fragment reste partiellement absent tant que le lecteur ne vient pas à sa rencontre.',
    fragments: [
      'Le blanc conserve la trace.',
      'Une ligne manque. Le sens reste.',
      'L’intervalle est une ponctuation.',
      'Le silence possède sa propre syntaxe.',
      'Ce qui disparaît continue d’agir.',
      'if (presence) erase();',
    ],
    medium: 'Texte interactif',
    behavior: 'Révélation',
    experience: 'absence',
    image: imageA,
  },

  {
    id: 'memory-matrix',
    chapter: 'Mémoire',
    title: 'Matrice de mémoire',
    subtitle: 'Archives instables',
    preview:
      'Des fragments reviennent, mais jamais exactement dans le même état.',
    hypothesis:
      'Une archive peut-elle se souvenir de ses propres transformations ?',
    mainText:
      'La mémoire n’est pas présentée comme un document stable mais comme une grille mouvante. Certaines zones s’éclairent, d’autres s’effacent. Chaque reprise déplace légèrement ce qui semblait acquis.',
    consequence:
      'Se souvenir, ici, signifie reconstruire.',
    interactionNote:
      'Le système conserve la trace du fragment précédent. La lecture suivante hérite donc toujours de quelque chose.',
    fragments: [
      'Chaque reprise modifie la source.',
      'Une archive peut hésiter.',
      'La mémoire est une interface.',
      'Le détail survit au récit.',
      'Reconstruction en cours…',
      'remember(x) ≠ x',
    ],
    medium: 'Archive générative',
    behavior: 'Recomposition',
    experience: 'memory',
    image: imageB,
  },

  {
    id: 'machine-reading',
    chapter: 'Interprétation',
    title: 'Lecture machine',
    subtitle: 'Quand le système interprète',
    preview:
      'Une pièce sur l’écart entre reconnaître des signes et comprendre une phrase.',
    hypothesis:
      'Reconnaître une structure revient-il à comprendre ce qu’elle signifie ?',
    mainText:
      'La machine classe, segmente et rapproche. Le lecteur, lui, hésite. Entre les deux demeure un espace difficile à mesurer : celui où une phrase cesse d’être une suite de signes et devient une expérience.',
    consequence:
      'Reconnaître n’est pas comprendre.',
    interactionNote:
      'Chaque fragment peut être lu comme donnée ou comme phrase. Le contenu reste identique ; le régime de lecture change.',
    fragments: [
      'Reconnaître n’est pas comprendre.',
      'La probabilité laisse une ombre.',
      'Le contexte déborde la fenêtre.',
      'Une phrase résiste au classement.',
      'Le sens excède son étiquette.',
      'confidence: 0.71',
    ],
    medium: 'Essai visuel',
    behavior: 'Interprétation',
    experience: 'machine',
    image: imageC,
  },

  {
    id: 'recursive-letter',
    chapter: 'Récursion',
    title: 'Lettre récursive',
    subtitle: 'Un texte qui revient sur lui-même',
    preview:
      'Chaque lecture replie la précédente et déplace légèrement le point de départ.',
    hypothesis:
      'Peut-on revenir au même texte sans revenir au même endroit ?',
    mainText:
      'La récursion devient un procédé littéraire. Chaque fragment appelle un autre fragment, puis revient au précédent avec une nuance nouvelle. Le parcours produit moins une boucle qu’une spirale.',
    consequence:
      'Revenir n’est jamais répéter.',
    interactionNote:
      'Le dernier fragment renvoie au premier. Mais entre les deux, le contexte a changé.',
    fragments: [
      'Revenir n’est jamais répéter.',
      'Le texte se souvient du détour.',
      'Une boucle peut déplacer.',
      'La sortie est dans l’entrée.',
      'Le commencement n’est plus intact.',
      'return differently;',
    ],
    medium: 'Narration récursive',
    behavior: 'Boucle / variation',
    experience: 'recursion',
    image: imageA,
  },

  {
    id: 'compressed-season',
    chapter: 'Compression',
    title: 'Saison compressée',
    subtitle: 'Poésie sous contrainte',
    preview:
      'Une expérience sur ce qui subsiste lorsque le texte est progressivement réduit.',
    hypothesis:
      'Jusqu’où peut-on retirer sans perdre la sensation ?',
    mainText:
      'La compression n’est pas une économie technique mais une question poétique. Chaque réduction retire de l’information tout en augmentant la pression exercée sur ce qui reste.',
    consequence:
      'Moins de signes ne signifie pas nécessairement moins de présence.',
    interactionNote:
      'À mesure que la lecture avance, la phrase se contracte. Le sens ne disparaît pas d’un coup : il change de densité.',
    fragments: [
      'Le vent tient dans trois lignes.',
      'Le pixel garde la saison.',
      'Réduire sans assécher.',
      'La brièveté augmente la pression.',
      'Trois mots. Même température.',
      'lossless: peut-être.',
    ],
    medium: 'Poésie contrainte',
    behavior: 'Compression',
    experience: 'compression',
    image: imageB,
  },

  {
    id: 'error-garden',
    chapter: 'Erreur',
    title: 'Jardin d’erreurs',
    subtitle: 'L’accident comme méthode',
    preview:
      'Une anomalie n’est plus supprimée automatiquement : elle est observée.',
    hypothesis:
      'Que révèle un système au moment précis où il cesse de fonctionner comme prévu ?',
    mainText:
      'Décalage, répétition, interruption : l’erreur devient matériau lorsqu’elle produit une lecture qui n’existait pas dans le plan initial. Le défaut n’est pas célébré pour lui-même ; il révèle la règle qu’il vient de rompre.',
    consequence:
      'Parfois, corriger efface précisément ce qu’il fallait regarder.',
    interactionNote:
      'Chaque sélection provoque un léger déplacement avant stabilisation. L’erreur reste perceptible, mais ne devient jamais spectacle.',
    fragments: [
      'Le défaut ouvre une bifurcation.',
      'L’erreur montre le système.',
      'Corriger parfois efface.',
      'L’accident révèle la règle.',
      'Le décalage devient une trace.',
      'unexpected token: beauty',
    ],
    medium: 'Étude expérimentale',
    behavior: 'Erreur contrôlée',
    experience: 'error',
    image: imageC,
  },
];
export function formatArtworkIndex(position: number) {
  return String(position + 1).padStart(2, '0');
}

export function formatArtworkTotal(total = artworks.length) {
  return String(total).padStart(2, '0');
}
