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
      'Le blanc n’encadre plus la phrase : il en devient une partie active.',
    hypothesis:
      'Que peut dire ce qui n’est pas écrit ?',
    mainText:
      'Ici, le blanc n’entoure pas la phrase : il agit avec elle. Il coupe, retarde, retient. Une partie du texte n’existe pour le lecteur qu’au moment où il vient la chercher.',
    consequence:
      'Le manque devient une forme de présence.',
    residue:
      'La lecture garde la forme du manque.',
    interactionNote:
      'Approchez les absences. Certaines se révèlent ; d’autres peuvent rester.',
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
      'Un souvenir revient, déplacé par ce qui l’a précédé.',
    hypothesis:
      'Un souvenir reste-t-il le même chaque fois qu’il revient ?',
    mainText:
      'Rien ne revient intact. À chaque reprise, un détail glisse, un autre persiste. La version suivante hérite de la précédente sans pouvoir la restituer exactement.',
    consequence:
      'Se souvenir, c’est déjà réécrire.',
    residue:
      'La dernière version ne sait plus laquelle était la première.',
    interactionNote:
      'Faites revenir la phrase. Observez ce qui change — et ce qui insiste.',
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
      'Les mêmes signes passent du regard humain au classement machine — sans produire le même sens.',
    hypothesis:
      'Reconnaître une structure, est-ce déjà comprendre ?',
    mainText:
      'La machine peut segmenter, rapprocher, attribuer une probabilité. Le lecteur peut hésiter, associer, se contredire. Entre les deux, les signes restent les mêmes ; ce qu’ils deviennent change.',
    consequence:
      'Le classement laisse toujours quelque chose dehors.',
    residue:
      'Ce qui est correctement classé peut encore rester incompris.',
    interactionNote:
      'Passez d’une lecture à l’autre sans changer les signes.',
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
      'Une lettre revient à son point de départ, mais le détour l’a déjà modifiée.',
    hypothesis:
      'Peut-on revenir au même texte sans revenir au même endroit ?',
    mainText:
      'La lettre revient. Une formule se répète, puis se déplace. Ce qui semblait être une boucle accumule ses détours jusqu’à devenir une spirale.',
    consequence:
      'Chaque retour déplace son origine.',
    residue:
      'Le retour contient désormais le détour.',
    interactionNote:
      'Relancez le texte. Chaque retour conserve une part du détour.',
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
      'Une saison se contracte jusqu’à ne laisser que sa température.',
    hypothesis:
      'Combien peut-on retirer avant de perdre la sensation ?',
    mainText:
      'La phrase perd d’abord ses détails, puis ses appuis. Ce qui demeure doit porter davantage. À la fin, quelques mots suffisent peut-être encore à garder une saison.',
    consequence:
      'Retirer change le poids de ce qui reste.',
    residue:
      'Ce qui reste porte le poids de ce qui a été retiré.',
    interactionNote:
      'Compressez la phrase jusqu’à sa limite.',
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
      'Une anomalie persiste assez longtemps pour révéler la règle qu’elle dérange.',
    hypothesis:
      'Que devient une règle lorsqu’une erreur la rend visible ?',
    mainText:
      'Un décalage, une omission, une répétition. L’erreur n’est pas réparée tout de suite. Elle reste assez longtemps pour montrer la structure qu’elle vient de rompre.',
    consequence:
      'Le défaut rend la règle perceptible.',
    residue:
      'La règle devient visible dans la forme de sa rupture.',
    interactionNote:
      'Laissez chaque erreur agir avant de poursuivre.',
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
