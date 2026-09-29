import { experimentEase } from '../../../lib/motion';
import {
  AnimatePresence,
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

const cycleVariations = [
  [
    'Revenir n’est jamais tout à fait répéter.',
    'Le texte se souvient du détour qu’il vient de faire.',
    'Une boucle peut déplacer son point de départ.',
    'La sortie était déjà dans l’entrée.',
    'Le commencement n’est plus tout à fait intact.',
    'return differently; // again',
  ],

  [
    'Revenir n’est plus revenir au même endroit.',
    'Le texte se souvient maintenant de s’être souvenu.',
    'La boucle déplace ce qui la traverse.',
    'L’entrée porte désormais la trace de la sortie.',
    'Le commencement reconnaît qu’il a changé.',
    'return changed;',
  ],
];

const cycleNotes = [
  'Vous avez déjà lu cette page. Pas encore.',
  'Quelque chose ressemble exactement à ce qui précédait.',
  'La page revient. Le point de départ, non.',
];

export default function RecursiveExperiment({
  artwork,
}: Props) {
  const reduceMotion = useReducedMotion();
  const cycles = [artwork.fragments, ...cycleVariations];

  const [passage, setPassage] =
    useState(0);

  const [cycle, setCycle] =
    useState(0);

  const [previousText, setPreviousText] =
    useState<string | null>(null);

  const [ended, setEnded] =
    useState(false);

  const cycleIndex = Math.min(
    cycle,
    cycles.length - 1,
  );

  const currentText =
    cycles[cycleIndex][passage];

  const finalPassage =
    passage === cycles[cycleIndex].length - 1;

  const finalCycle =
    cycleIndex === cycles.length - 1;

  const advance = () => {
    if (ended) return;

    setPreviousText(currentText);

    if (finalPassage && finalCycle) {
      setEnded(true);
      return;
    }

    if (finalPassage) {
      setCycle((current) =>
        Math.min(
          current + 1,
          cycles.length - 1,
        ),
      );

      setPassage(0);
      return;
    }

    setPassage((current) =>
      current + 1,
    );
  };

  const restart = () => {
    setPassage(0);
    setCycle(0);
    setPreviousText(null);
    setEnded(false);
  };

  const passageNumber = String(
    passage + 1,
  ).padStart(2, '0');

  const cycleNumber = String(
    cycleIndex + 1,
  ).padStart(2, '0');

  return (
    <section
      className="border-t border-white/12 pt-10"
      aria-labelledby={`recursive-${artwork.id}`}
    >
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[.48fr_1.52fr]">
        <div>
          <h2
            id={`recursive-${artwork.id}`}
            className="micro-meta text-gold"
          >
            Interaction / récursion
          </h2>

          <p className="mt-4 max-w-[330px] text-sm leading-6 text-white/45">
            {artwork.interactionNote}
          </p>

          <p className="mt-8 max-w-[280px] font-serif text-lg italic leading-7 text-white/30">
            Continuer fait avancer.
            <br />
            Arriver au bout fait revenir.
            <br />
            Revenir ne restaure rien.
          </p>

          <div className="mt-10 max-w-[285px] border-t border-white/10 pt-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                  Passage
                </div>

                <div className="mt-2 font-mono text-[10px] text-gold/70">
                  {passageNumber} / {String(cycles[cycleIndex].length).padStart(2, '0')}
                </div>
              </div>

              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                  Boucle
                </div>

                <div className="mt-2 font-mono text-[10px] text-gold/70">
                  {cycleNumber} / {String(cycles.length).padStart(2, '0')}
                </div>
              </div>
            </div>

            <div
              className="mt-5 grid grid-cols-6 gap-2"
              aria-hidden="true"
            >
              {cycles[cycleIndex].map(
                (_, index) => (
                  <motion.span
                    key={index}
                    initial={false}
                    animate={{
                      opacity:
                        index <= passage
                          ? 0.7
                          : 0.08,
                      scaleX:
                        index <= passage
                          ? 1
                          : 0.3,
                    }}
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : 0.4,
                    }}
                    className="h-px origin-left bg-gold"
                  />
                ),
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
            {currentText}{' '}
            Boucle {cycleIndex + 1} sur {cycles.length}.
            Passage {passage + 1} sur {cycles[cycleIndex].length}.
            {ended
              ? ' La boucle a été interrompue.'
              : ''}
          </div>

          <div className="relative min-h-[340px] sm:min-h-[410px] overflow-hidden border-y border-white/10 px-5 py-9 md:px-10 md:py-12">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[15%] top-0 w-px bg-white/[0.025]"
            />

            <div
              aria-hidden="true"
              className="absolute bottom-[18%] left-0 right-0 h-px bg-white/[0.025]"
            />

            <div className="relative min-h-[315px]">
              {previousText && !ended && (
                <motion.p
                  key={`previous-${cycle}-${passage}`}
                  aria-hidden="true"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 0.075,
                    x: cycleIndex > 0 ? 8 : 4,
                    y: 62,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.8,
                  }}
                  className="absolute left-0 top-0 max-w-[25ch] font-serif text-[clamp(2rem,3.7vw,4.4rem)] leading-[1] text-white"
                >
                  {previousText}
                </motion.p>
              )}

              {!ended ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${cycle}-${passage}`}
                    initial={{
                      opacity: reduceMotion ? 1 : 0,
                      x: reduceMotion ? 0 : 10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: reduceMotion
                        ? 1
                        : 0.08,
                      x: reduceMotion ? 0 : -8,
                    }}
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : cycleIndex === 0
                          ? 0.5
                          : 0.75,
                      ease: experimentEase,
                    }}
                    className="relative z-10"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-gold/55">
                        Lettre / passage {passageNumber}
                      </span>

                      <span
                        aria-hidden="true"
                        className="h-px w-8 bg-gold/30"
                      />
                    </div>

                    <p
                      className="mt-11 max-w-[22ch] break-words font-serif text-[clamp(2.05rem,4.4vw,5.1rem)] leading-[0.96] text-ink"
                    >
                      {currentText}
                    </p>

                    <motion.p
                      key={`note-${cycleIndex}`}
                      initial={{
                        opacity: reduceMotion ? 1 : 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 1,
                      }}
                      className="mt-12 max-w-[34ch] font-serif text-base italic leading-6 text-white/22"
                    >
                      {cycleNotes[cycleIndex]}
                    </motion.p>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{
                    opacity: reduceMotion ? 1 : 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 1.1,
                  }}
                >
                  <div className="micro-meta text-gold/55">
                    Interruption / boucle {cycleNumber}
                  </div>

                  <p className="mt-11 max-w-[24ch] break-words font-serif text-[clamp(2.05rem,4vw,4.7rem)] leading-[0.98] text-white/75">
                    La boucle s’arrête.
                    <br />
                    Le texte, lui, ne revient pas
                    à son état initial.
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-7 flex min-h-10 flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/18">
              {ended
                ? 'état / interrompu'
                : cycleIndex === 0
                  ? 'écart / 00'
                  : `écart / +${cycleIndex}`}
            </span>

            {!ended ? (
              <button
                type="button"
                onClick={advance}
                className="inline-flex min-h-11 items-center py-2 text-left font-mono text-[9px] uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
              >
                {finalPassage
                  ? finalCycle
                    ? 'Sortir de la boucle'
                    : 'Revenir au début'
                  : 'Passage suivant'}
              </button>
            ) : (
              <button
                type="button"
                onClick={restart}
                className="inline-flex min-h-11 items-center py-2 text-left font-mono text-[9px] uppercase tracking-[0.18em] text-white/34 transition-colors duration-300 hover:text-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
              >
                Relire depuis le commencement
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
