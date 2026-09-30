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

const memoryVersions = [
  'Le souvenir conserve ce qui a eu lieu.',
  'Le souvenir conserve ce qui semble avoir eu lieu.',
  'Le souvenir retient ce qui semble avoir eu lieu.',
  'Le souvenir retient ce qui aurait pu avoir lieu.',
  'Le souvenir reconstruit ce qui aurait pu avoir lieu.',
  'Le souvenir reconstruit ce qui n’a peut-être jamais eu lieu.',
];

const mutationNotes = [
  'source / certitude',
  'ajout / semble',
  'substitution / conserve → retient',
  'glissement / semble → aurait pu',
  'substitution / retient → reconstruit',
  'rupture / l’événement devient incertain',
];

const traceOffsets = [
  { x: -2, y: 54 },
  { x: 5, y: 88 },
  { x: -5, y: 122 },
  { x: 8, y: 156 },
  { x: -7, y: 190 },
];

export default function MemoryExperiment({
  artwork,
}: Props) {
  const reduceMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const history = Array.from({ length: currentIndex }, (_, index) => index);

  const total = memoryVersions.length;

  const isFinal =
    currentIndex === total - 1;

  const reconstruct = () => {
    if (isFinal) return;

    setCurrentIndex((current) =>
      Math.min(current + 1, total - 1),
    );
  };

  const restart = () => {
    setCurrentIndex(0);
  };

  const displayIndex = String(
    currentIndex + 1,
  ).padStart(2, '0');

  const displayTotal = String(
    total,
  ).padStart(2, '0');

  return (
    <section
      className="border-t border-white/12 pt-10"
      aria-labelledby={`memory-${artwork.id}`}
    >
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <div>
          <h2
            id={`memory-${artwork.id}`}
            className="micro-meta text-gold"
          >
            Interaction / mémoire
          </h2>

          <p className="mt-4 max-w-[340px] text-sm leading-6 text-muted">
            {artwork.interactionNote}
          </p>

          <p className="mt-8 max-w-[290px] font-serif text-lg italic leading-7 text-muted-2">
            Rejouer ne restitue pas.
            <br />
            La phrase revient,
            mais jamais exactement
            depuis le même endroit.
          </p>

          <div className="mt-10 max-w-[290px] border-t border-white/10 pt-5">
            <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em]">
              <span className="text-muted-2">
                Reconstruction
              </span>

              <span className="text-gold/70">
                {displayIndex} / {displayTotal}
              </span>
            </div>

            <div
              className="mt-4 flex gap-2"
              aria-hidden="true"
            >
              {memoryVersions.map((_, index) => (
                <motion.span
                  key={index}
                  initial={false}
                  animate={{
                    opacity:
                      index <= currentIndex
                        ? 0.7
                        : 0.08,
                    scaleX:
                      index <= currentIndex
                        ? 1
                        : 0.3,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.5,
                    ease: experimentEase,
                  }}
                  className="h-px flex-1 origin-left bg-gold"
                />
              ))}
            </div>

            <motion.div
              key={currentIndex}
              initial={{
                opacity: reduceMotion ? 1 : 0,
              }}
              animate={{ opacity: 1 }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
              }}
              className="mt-5 font-mono text-[8px] uppercase tracking-[0.15em] text-muted-2"
            >
              {mutationNotes[currentIndex]}
            </motion.div>
          </div>
        </div>

        <div>
          <div
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          >
            {memoryVersions[currentIndex]}{' '}
            Reconstruction {displayIndex} sur {displayTotal}.
            {history.length === 0
              ? ' Aucune trace précédente.'
              : ` ${history.length} trace${history.length > 1 ? 's' : ''} conservée${history.length > 1 ? 's' : ''}.`}
            {isFinal
              ? ' Dernière reconstruction atteinte.'
              : ''}
          </div>

          <div className="relative min-h-[340px] sm:min-h-[420px] overflow-hidden border-y border-white/10 px-5 py-10 md:px-10 md:py-14">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[52%] h-px bg-white/[0.035]"
            />

            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[18%] top-0 w-px bg-white/[0.025]"
            />

            <div className="relative min-h-[310px]">
              {history
                .slice()
                .reverse()
                .map((versionIndex, depth) => {
                  const offset =
                    traceOffsets[
                      Math.min(
                        depth,
                        traceOffsets.length - 1,
                      )
                    ];

                  const opacity = Math.max(
                    0.045,
                    0.2 - depth * 0.035,
                  );

                  return (
                    <motion.div
                      key={versionIndex}
                      aria-hidden="true"
                      initial={{
                        opacity: 0,
                        x: 0,
                        y: 25,
                      }}
                      animate={{
                        opacity,
                        x: offset.x,
                        y: offset.y,
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.85,
                        ease: experimentEase,
                      }}
                      className="absolute inset-x-0 top-0"
                    >
                      <div className="font-mono text-[7px] uppercase tracking-[0.16em] text-gold">
                        trace{' '}
                        {String(
                          versionIndex + 1,
                        ).padStart(2, '0')}
                      </div>

                      <p className="mt-3 max-w-[32ch] font-serif text-[clamp(1.25rem,2.15vw,2.15rem)] leading-[1.12] text-white">
                        {
                          memoryVersions[
                            versionIndex
                          ]
                        }
                      </p>
                    </motion.div>
                  );
                })}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{
                    opacity: reduceMotion ? 1 : 0,
                    y: reduceMotion ? 0 : -8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: reduceMotion
                      ? 1
                      : 0.08,
                    y: reduceMotion ? 0 : 22,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.7,
                    ease: experimentEase,
                  }}
                  className="relative z-20"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-gold">
                      Version {displayIndex}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-gold/35"
                    />
                  </div>

                  <p
                    className="mt-8 max-w-[23ch] font-serif text-[clamp(2.15rem,4.1vw,4.7rem)] leading-[0.98] text-ink"
                  >
                    {memoryVersions[currentIndex]}
                  </p>

                  <div className="mt-9 max-w-[34ch] border-l border-white/10 pl-4">
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-2">
                      annotation d’archive
                    </p>

                    <p className="mt-3 font-serif text-sm italic leading-6 text-muted-2">
                      {
                        artwork.fragments[
                          Math.min(
                            currentIndex,
                            artwork.fragments.length - 1,
                          )
                        ]
                      }
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-7 flex min-h-10 flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-2">
              {history.length === 0
                ? 'archive / aucune trace'
                : `archive / ${String(
                    history.length,
                  ).padStart(2, '0')} trace${
                    history.length > 1
                      ? 's'
                      : ''
                  }`}
            </span>

            {!isFinal ? (
              <button
                type="button"
                onClick={reconstruct}
                className="inline-flex min-h-11 items-center py-2 text-left font-mono text-[9px] uppercase tracking-[0.18em] text-gold transition-colors duration-300 hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
              >
                Reconstruire depuis la trace
              </button>
            ) : (
              <button
                type="button"
                onClick={restart}
                className="inline-flex min-h-11 items-center py-2 text-left font-mono text-[9px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
              >
                Revenir au souvenir initial
              </button>
            )}
          </div>

          {isFinal && (
            <motion.p
              initial={{
                opacity: reduceMotion ? 1 : 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 1,
                delay: reduceMotion ? 0 : 0.25,
              }}
              className="mt-10 max-w-[30ch] font-serif text-xl italic leading-7 text-muted-2"
            >
              À force d’être rappelée,
              la phrase ne se souvient plus
              exactement d’où elle vient.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
