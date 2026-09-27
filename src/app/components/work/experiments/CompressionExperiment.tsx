import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';
import {
  useEffect,
  useState,
} from 'react';

import type { Artwork } from '../../../data/artworks';

type Props = {
  artwork: Artwork;
};

const stages = [
  {
    text:
      'Le vent tient dans trois lignes. Le pixel garde la saison. Réduire sans assécher.',
    width: '100%',
    fontSize: 'clamp(2rem, 4vw, 4.3rem)',
    remaining: '100',
    removed: null,
  },
  {
    text:
      'Le vent tient dans trois lignes. Le pixel garde la saison.',
    width: '88%',
    fontSize: 'clamp(2.1rem, 4.1vw, 4.4rem)',
    remaining: '82',
    removed: 'réduire sans assécher',
  },
  {
    text:
      'Le vent tient. Le pixel garde la saison.',
    width: '72%',
    fontSize: 'clamp(2.25rem, 4.25vw, 4.6rem)',
    remaining: '66',
    removed: 'dans trois lignes',
  },
  {
    text:
      'Vent. Pixel. Saison.',
    width: '56%',
    fontSize: 'clamp(2.5rem, 4.5vw, 4.9rem)',
    remaining: '48',
    removed: 'tient / garde / le',
  },
  {
    text:
      'Vent / saison.',
    width: '42%',
    fontSize: 'clamp(2.8rem, 4.9vw, 5.3rem)',
    remaining: '31',
    removed: 'pixel',
  },
  {
    text:
      'Saison.',
    width: '30%',
    fontSize: 'clamp(3.2rem, 5.4vw, 5.8rem)',
    remaining: '17',
    removed: 'vent',
  },
];

const durations = [
  0.9,
  0.78,
  0.64,
  0.5,
  0.38,
  0.28,
];

export default function CompressionExperiment({
  artwork,
}: Props) {
  const reduceMotion = useReducedMotion();

  const [stage, setStage] =
    useState(0);

  const [removedHistory, setRemovedHistory] =
    useState<string[]>([]);

  useEffect(() => {
    setStage(0);
    setRemovedHistory([]);
  }, [artwork.id]);

  const current = stages[stage];

  const isFinal =
    stage === stages.length - 1;

  const compress = () => {
    if (isFinal) return;

    const nextStage = stage + 1;

    const removed =
      stages[nextStage].removed;

    if (removed) {
      setRemovedHistory((history) => [
        ...history,
        removed,
      ]);
    }

    setStage(nextStage);
  };

  const restore = () => {
    setStage(0);
    setRemovedHistory([]);
  };

  const stageNumber = String(
    stage + 1,
  ).padStart(2, '0');

  const total = String(
    stages.length,
  ).padStart(2, '0');

  return (
    <section
      className="border-t border-white/12 pt-10"
      aria-labelledby={`compression-${artwork.id}`}
    >
      <div className="grid gap-10 lg:grid-cols-[.48fr_1.52fr]">
        <div>
          <div
            id={`compression-${artwork.id}`}
            className="micro-meta text-[#d6b86f]"
          >
            Interaction / compression
          </div>

          <p className="mt-4 max-w-[330px] text-sm leading-6 text-white/45">
            {artwork.interactionNote}
          </p>

          <p className="mt-8 max-w-[280px] font-serif text-lg italic leading-7 text-white/30">
            Chaque passage retire.
            <br />
            Le cadre se contracte.
            <br />
            Ce qui reste porte davantage.
          </p>

          <div className="mt-10 max-w-[285px] border-t border-white/10 pt-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                Matière restante
              </span>

              <span className="font-mono text-[9px] tracking-[0.16em] text-[#d6b86f]/70">
                {current.remaining}%
              </span>
            </div>

            <div className="mt-4 h-px bg-white/8">
              <motion.div
                initial={false}
                animate={{
                  width: `${current.remaining}%`,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0
                    : durations[stage],
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="h-px bg-[#d6b86f]/65"
              />
            </div>

            <div className="mt-7">
              <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/18">
                Annotation
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={stage}
                  initial={{
                    opacity: reduceMotion ? 1 : 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.4,
                  }}
                  className="mt-3 max-w-[24ch] font-serif text-base italic leading-6 text-white/28"
                >
                  {
                    artwork.fragments[
                      Math.min(
                        stage,
                        artwork.fragments.length - 1,
                      )
                    ]
                  }
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div>
          <div className="relative min-h-[430px] overflow-hidden border-y border-white/10 px-5 py-10 md:px-10 md:py-14">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-1/2 w-px bg-white/[0.025]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 h-px bg-white/[0.025]"
            />

            <div className="relative flex min-h-[315px] items-center justify-center">
              <motion.div
                initial={false}
                animate={{
                  width: current.width,
                }}
                transition={{
                  duration: reduceMotion
                    ? 0
                    : durations[stage],
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="relative border-x border-white/8 px-5 py-12 text-center md:px-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-[#d6b86f]/55">
                    Compression {stageNumber}
                  </span>

                  <span className="font-mono text-[8px] tracking-[0.16em] text-white/16">
                    / {total}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={stage}
                    aria-live="polite"
                    initial={{
                      opacity: reduceMotion ? 1 : 0,
                      scaleX: reduceMotion ? 1 : 1.035,
                    }}
                    animate={{
                      opacity: 1,
                      scaleX: 1,
                    }}
                    exit={{
                      opacity: reduceMotion
                        ? 1
                        : 0.08,
                      scaleX: reduceMotion
                        ? 1
                        : 0.94,
                    }}
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : durations[stage],
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    style={{
                      fontSize:
                        current.fontSize,
                    }}
                    className="mx-auto mt-10 font-serif leading-[0.98] text-[#f4f0e8]"
                  >
                    {current.text}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          <div className="mt-7 flex min-h-10 items-center justify-between gap-6">
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/18">
              {isFinal
                ? 'densité / maximale'
                : `retrait / ${stageNumber}`}
            </span>

            {!isFinal ? (
              <button
                type="button"
                onClick={compress}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#d6b86f] transition-colors duration-300 hover:text-[#f4f0e8] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#d6b86f] focus-visible:outline-offset-4"
              >
                Comprimer encore
              </button>
            ) : (
              <button
                type="button"
                onClick={restore}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/36 transition-colors duration-300 hover:text-[#d6b86f] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#d6b86f] focus-visible:outline-offset-4"
              >
                Restaurer la source
              </button>
            )}
          </div>

          {removedHistory.length > 0 && (
            <div className="mt-9 border-t border-white/8 pt-6">
              <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/18">
                Hors texte
              </div>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {removedHistory.map(
                  (removed, index) => (
                    <motion.span
                      key={`${removed}-${index}`}
                      initial={{
                        opacity: reduceMotion
                          ? 0.2
                          : 0,
                      }}
                      animate={{
                        opacity:
                          0.22 -
                          Math.min(
                            index * 0.025,
                            0.1,
                          ),
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.7,
                      }}
                      className="font-serif text-sm italic text-white line-through decoration-white/15"
                    >
                      {removed}
                    </motion.span>
                  ),
                )}
              </div>
            </div>
          )}

          {isFinal && (
            <motion.p
              initial={{
                opacity: reduceMotion ? 1 : 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: reduceMotion
                  ? 0
                  : 0.9,
                delay: reduceMotion
                  ? 0
                  : 0.15,
              }}
              className="mt-10 max-w-[29ch] font-serif text-xl italic leading-7 text-white/25"
            >
              Presque tout a disparu.
              <br />
              Ce qui reste prend davantage
              de place.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
