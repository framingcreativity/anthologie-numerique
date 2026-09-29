import {
  motion,
  useReducedMotion,
} from 'motion/react';
import {
  useState,
} from 'react';

import type { Artwork } from '../../../data/artworks';

type Props = {
  artwork: Artwork;
};

type Analysis = {
  subject: string;
  action: string;
  object: string;
  relation: string;
  confidence: string;
  output: string;
  remainder: string;
};

const analyses: Analysis[] = [
  {
    subject: 'reconnaître',
    action: 'distinguer',
    object: 'comprendre',
    relation: 'non-équivalence',
    confidence: '0.96',
    output:
      'Deux opérations cognitives sont présentées comme distinctes.',
    remainder:
      'La phrase parle aussi de l’écart entre identifier quelque chose et en faire réellement l’expérience.',
  },
  {
    subject: 'probabilité',
    action: 'laisser',
    object: 'ombre',
    relation: 'agent → effet',
    confidence: '0.82',
    output:
      'Une entité abstraite produit ou laisse un objet nommé « ombre ».',
    remainder:
      'L’ombre n’est pas un objet. Elle désigne ce que le chiffre ne parvient pas à dissiper.',
  },
  {
    subject: 'contexte',
    action: 'déborder',
    object: 'fenêtre',
    relation: 'contenu → limite',
    confidence: '0.88',
    output:
      'Un contenu excède les limites spatiales d’une fenêtre.',
    remainder:
      'La fenêtre est autant une limite technique qu’une limite de compréhension.',
  },
  {
    subject: 'phrase',
    action: 'résister',
    object: 'classement',
    relation: 'objet → catégorie',
    confidence: '0.77',
    output:
      'Une unité textuelle ne correspond pas clairement à une classe.',
    remainder:
      'La résistance n’est pas un échec de classification. Elle fait partie de ce que la phrase produit.',
  },
  {
    subject: 'sens',
    action: 'excéder',
    object: 'étiquette',
    relation: 'contenu → catégorie',
    confidence: '0.84',
    output:
      'La valeur sémantique dépasse la catégorie descriptive attribuée.',
    remainder:
      'L’étiquette décrit. Elle ne contient jamais entièrement ce qu’elle désigne.',
  },
  {
    subject: 'confidence',
    action: 'assigner',
    object: '0.71',
    relation: 'clé → valeur',
    confidence: '0.99',
    output:
      'Paire clé-valeur valide. Score numérique compris entre 0 et 1.',
    remainder:
      'Le système reconnaît parfaitement la forme — et ne sait toujours pas ce que cette confiance engage.',
  },
];

export default function MachineExperiment({
  artwork,
}: Props) {
  const reduceMotion = useReducedMotion();

  const [selected, setSelected] =
    useState(0);

  const [showRemainder, setShowRemainder] =
    useState(false);

  const analysis =
    analyses[
      Math.min(selected, analyses.length - 1)
    ];

  const phrase =
    artwork.fragments[
      Math.min(
        selected,
        artwork.fragments.length - 1,
      )
    ];

  const choose = (index: number) => {
    setSelected(index);
    setShowRemainder(false);
  };

  return (
    <section
      className="border-t border-white/12 pt-10"
      aria-labelledby={`machine-${artwork.id}`}
    >
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[.42fr_1.58fr]">
        <div>
          <h2
            id={`machine-${artwork.id}`}
            className="micro-meta text-gold"
          >
            Interaction / interprétation
          </h2>

          <p className="mt-4 max-w-[330px] text-sm leading-6 text-white/45">
            {artwork.interactionNote}
          </p>

          <p className="mt-8 max-w-[285px] font-serif text-lg italic leading-7 text-white/30">
            La structure peut être correcte.
            <br />
            L’interprétation peut pourtant
            rester incomplète.
          </p>

          <div className="mt-10 border-t border-white/10 pt-5">
            <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/22">
              Corpus
            </div>

            <div className="mt-4 grid gap-px bg-white/8">
              {artwork.fragments.map(
                (fragment, index) => {
                  const active =
                    selected === index;

                  return (
                    <button
                      key={fragment}
                      type="button"
                      onClick={() =>
                        choose(index)
                      }
                      aria-pressed={active}
                      className={`grid grid-cols-[28px_1fr] gap-3 bg-work px-3 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:-outline-offset-1 ${
                        active
                          ? 'text-ink'
                          : 'text-white/28 hover:text-white/55'
                      }`}
                    >
                      <span className="font-mono text-[8px] text-gold/55">
                        {String(
                          index + 1,
                        ).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 font-serif text-sm">
                        {fragment}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </div>

        <div>
          <div
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          >
            {phrase}{' '}
            Phrase {selected + 1} sur {artwork.fragments.length}.
            Confiance système {analysis.confidence}.
            {showRemainder
              ? ` ${analysis.remainder}`
              : ' Le reste non classé est masqué.'}
          </div>

          <div className="grid border-y border-white/10 lg:grid-cols-[1.05fr_.95fr]">
            <div className="min-h-[390px] border-b border-white/10 px-5 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:py-10">
              <div className="flex items-center justify-between">
                <span className="micro-meta text-gold">
                  Phrase / lecteur
                </span>

                <span className="font-mono text-[8px] tracking-[0.16em] text-white/18">
                  {String(selected + 1).padStart(
                    2,
                    '0',
                  )}
                </span>
              </div>

              <motion.p
                key={phrase}
                initial={{
                  opacity: reduceMotion ? 1 : 0,
                  y: reduceMotion ? 0 : 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0
                    : 0.55,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="mt-12 max-w-[18ch] break-words font-serif text-[clamp(2.05rem,4vw,4.8rem)] leading-[0.98] text-ink"
              >
                {phrase}
              </motion.p>

              <p className="mt-10 max-w-[34ch] text-sm leading-6 text-white/28">
                Même chaîne de signes.
                Aucun changement de contenu.
                Seul le régime de lecture
                se déplace.
              </p>
            </div>

            <motion.div
              key={selected}
              initial={{
                opacity: reduceMotion ? 1 : 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: reduceMotion
                  ? 0
                  : 0.45,
              }}
              className="min-h-[390px] px-5 py-8 lg:px-8 lg:py-10"
            >
              <div className="micro-meta text-white/30">
                Analyse / système
              </div>

              <div className="mt-8 divide-y divide-white/8 border-y border-white/8">
                {[
                  ['sujet', analysis.subject],
                  ['action', analysis.action],
                  ['objet', analysis.object],
                  ['relation', analysis.relation],
                  [
                    'confiance',
                    analysis.confidence,
                  ],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 py-3"
                  >
                    <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/20">
                      {label}
                    </span>

                    <span className="break-words font-mono text-[10px] leading-5 text-white/55">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/20">
                  sortie
                </div>

                <p className="mt-3 max-w-[38ch] break-words font-mono text-[10px] leading-5 text-white/46">
                  {analysis.output}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="mt-7 flex min-h-10 flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/18">
              système / lecture littérale
            </span>

            <button
              type="button"
              onClick={() =>
                setShowRemainder(
                  (current) => !current,
                )
              }
              aria-expanded={showRemainder}
              aria-controls="machine-remainder"
              className="inline-flex min-h-11 items-center py-2 text-left font-mono text-[9px] uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
            >
              {showRemainder
                ? 'Masquer l’écart'
                : 'Voir ce qui échappe'}
            </button>
          </div>

          <motion.div
            id="machine-remainder"
            aria-hidden={!showRemainder}
            initial={false}
            animate={{
              height: showRemainder
                ? 'auto'
                : 0,
              opacity: showRemainder
                ? 1
                : 0,
            }}
            transition={{
              duration: reduceMotion
                ? 0
                : 0.55,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="overflow-hidden"
          >
            <div className="mt-8 border-l border-gold/35 pl-5">
              <div className="micro-meta text-gold/55">
                Reste non classé
              </div>

              <p className="mt-4 max-w-[38ch] font-serif text-xl italic leading-7 text-white/32">
                {analysis.remainder}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
