import syntaxeAbsenceImage from '../../assets/anthologie/syntaxe-absence.jpg';
import matriceMemoireImage from '../../assets/anthologie/matrice-memoire.jpg';
import lectureMachineImage from '../../assets/anthologie/lecture-machine.jpg';
import lettreRecursiveImage from '../../assets/anthologie/lettre-recursive.jpg';
import saisonCompresseeImage from '../../assets/anthologie/saison-compressee.jpg';
import jardinErreursImage from '../../assets/anthologie/jardin-erreurs.jpg';

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
  residue: string;
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
    residue:
      'La lecture garde la forme du manque.',
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
    image: syntaxeAbsenceImage,
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
    residue:
      'La dernière version ne sait plus laquelle était la première.',
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
    image: matriceMemoireImage,
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
    residue:
      'Ce qui est correctement classé peut encore rester incompris.',
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
    image: lectureMachineImage,
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
    residue:
      'Le retour contient désormais le détour.',
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
    image: lettreRecursiveImage,
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
    residue:
      'Ce qui reste porte le poids de ce qui a été retiré.',
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
    image: saisonCompresseeImage,
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
    residue:
      'La règle devient visible dans la forme de sa rupture.',
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
    image: jardinErreursImage,
  },
];
export function formatArtworkIndex(position: number) {
  return String(position + 1).padStart(2, '0');
}

export function formatArtworkTotal(total = artworks.length) {
  return String(total).padStart(2, '0');
}
