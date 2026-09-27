import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

import InteractiveArtPage from './InteractiveArtPage';

import imageA from 'figma:asset/07cb64d44f0ca7aa76b810053cdee15b1ec48375.png';
import imageB from 'figma:asset/b26d3432409095bed228b39abf9f8c845d4cd506.png';
import imageC from 'figma:asset/825c75d9988a36f04b9b0bc6f314908d70085d98.png';

export type Artwork = {
  id: string;
  index: string;
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
  image: string;
};

const works: Artwork[] = [
  {
    id: 'syntax-of-absence',
    index: '01',
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
    image: imageA,
  },

  {
    id: 'memory-matrix',
    index: '02',
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
    image: imageB,
  },

  {
    id: 'machine-reading',
    index: '03',
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
    image: imageC,
  },

  {
    id: 'recursive-letter',
    index: '04',
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
    image: imageA,
  },

  {
    id: 'compressed-season',
    index: '05',
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
    image: imageB,
  },

  {
    id: 'error-garden',
    index: '06',
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
    image: imageC,
  },
];

export default function Gallery() {
  const [active, setActive] = useState<Artwork | null>(null);

  return (
    <section
      id="pages"
      className="section-light"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32 lg:px-14">
        <div className="grid gap-10 border-b border-black/20 pb-12 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <div className="mb-5 micro-meta text-black/42">
              Collection / 06 études
            </div>

            <h2 className="text-[clamp(3.3rem,7vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.065em]">
              Pages-
              <br />
              œuvres
            </h2>
          </div>

          <div className="max-w-[720px] lg:justify-self-end">
            <p className="text-base leading-7 text-black/58 lg:text-lg">
              Six études. Une même question.
            </p>

            <p className="mt-4 font-serif text-[clamp(1.65rem,2.5vw,2.5rem)] italic leading-[1.2] text-[#a9853e]">
              <span className="block">
                Que devient l’écriture
              </span>

              <span className="block">
                quand l’interface participe réellement à la lecture ?
              </span>
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-px bg-black/20 md:grid-cols-2 lg:grid-cols-3">
          {works.map((work, index) => (
            <motion.button
              key={work.id}
              type="button"
              className="group digital-frame digital-noise relative min-h-[520px] overflow-hidden bg-[#0d0d0d] text-left text-white"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.05, 0.24),
              }}
              onClick={() => setActive(work)}
            >
              <img
                src={work.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale transition duration-700 group-hover:scale-[1.025] group-hover:opacity-42"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.12)_0%,rgba(5,5,5,.38)_38%,rgba(5,5,5,.90)_100%)]" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(214,184,111,.11),transparent_28%)]" />

              <div className="relative flex h-full min-h-[520px] flex-col justify-between p-6 md:p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[#e3ca87]">
                      ÉTUDE {work.index} / 06
                    </span>

                    <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/32">
                      {work.chapter}
                    </div>
                  </div>

                  <span className="grid h-9 w-9 place-items-center border border-white/18 text-white/62 transition group-hover:border-[#e3ca87] group-hover:text-[#e3ca87]">
                    <ArrowUpRight size={16} />
                  </span>
                </div>

                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="micro-meta border border-white/14 px-2.5 py-1 text-white/55">
                      {work.medium}
                    </span>

                    <span className="micro-meta border border-white/14 px-2.5 py-1 text-white/55">
                      {work.behavior}
                    </span>
                  </div>

                  <div className="mb-5 h-px w-full bg-white/10" />

                  <h3 className="max-w-[11ch] text-[2.65rem] font-medium leading-[0.95] tracking-[-0.05em]">
                    {work.title}
                  </h3>

                  <p className="mt-3 font-serif text-xl italic text-[#e3ca87]">
                    {work.subtitle}
                  </p>

                  <p className="mt-5 max-w-[36ch] text-sm leading-6 text-white/55">
                    {work.preview}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <InteractiveArtPage
        artwork={active}
        onClose={() => setActive(null)}
      />
    </section>
  );
}
