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

export default function MemoryExperiment({
  artwork,
}: Props) {
  const reduceMotion = useReducedMotion();

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [history, setHistory] =
    useState<number[]>([]);

  useEffect(() => {
    setCurrentIndex(0);
    setHistory([]);
  }, [artwork.id]);

  const isFinal =
    currentIndex >= artwork.fragments.length - 1;

  const reconstruct = () => {
    if (isFinal) return;

    setHistory((current) => [
      ...current,
      currentIndex,
    ]);

    setCurrentIndex((current) =>
      Math.min(
        current + 1,
        artwork.fragments.length - 1,
      ),
    );
  };

  const restart = () => {
    setCurrentIndex(0);
    setHistory([]);
  };

  const displayIndex = String(
    currentIndex + 1,
  ).padStart(2, '0');

  const total = String(
    artwork.fragments.length,
  ).padStart(2, '0');

  return (
    <section
      className="border-t border-white/12 pt-10"
      aria-labelledby={`memory-${artwork.id}`}
    >
      <div className="grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <div>
          <div
            id={`memory-${artwork.id}`}
            className="micro-meta text-[#d6b86f]"
          >
            Interaction / mémoire
          </div>

          <p className="mt-4 max-w-[340px] text-sm leading-6 text-white/45">
            {artwork.interactionNote}
          </p>

          <p className="mt-8 max-w-[280px] font-serif text-lg italic leading-7 text-white/30">
            Rejouer ne restitue pas.
            <br />
            Chaque retour déplace légèrement
            ce qui semblait certain.
          </p>

          <div className="mt-10 max-w-[280px] border-t border-white/10 pt-5">
            <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em]">
              <span className="text-white/24">
                Reconstruction
              </span>

              <span className="text-[#d6b86f]/70">
                {displayIndex} / {total}
              </span>
            </div>

            <div
              className="mt-4 flex gap-2"
              aria-hidden="true"
            >
              {artwork.fragments.map((_, index) => (
                <motion.span
                  key={index}
                  initial={false}
                  animate={{
                    opacity:
                      index <= currentIndex
                        ? 0.65
                        : 0.08,
                    scaleX:
                      index <= currentIndex
                        ? 1
                        : 0.35,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.5,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="h-px flex-1 origin-left bg-[#d6b86f]"
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="relative min-h-[390px] overflow-hidden border-y border-white/10 px-5 py-10 md:px-10 md:py-14">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 h-px bg-white/[0.035]"
            />

            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[18%] top-0 w-px bg-white/[0.025]"
            />

            <div className="relative min-h-[280px]">
              {history
                .slice()
                .reverse()
                .map((index, depth) => {
                  const opacity = Math.max(
                    0.055,
                    0.22 - depth * 0.045,
                  );

                  return (
                    <motion.p
                      key={`${index}-${depth}`}
                      aria-hidden="true"
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity,
                        y:
                          58 +
                          depth * 34,
                        x:
                          depth % 2 === 0
                            ? depth * 4
                            : depth * -4,
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.8,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                      className="absolute left-0 max-w-[30ch] font-serif text-[clamp(1.35rem,2.3vw,2.25rem)] leading-[1.16] text-white"
                    >
                      {artwork.fragments[index]}
                    </motion.p>
                  );
                })}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{
                    opacity: reduceMotion ? 1 : 0,
                    y: reduceMotion ? 0 : -6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: reduceMotion ? 1 : 0.12,
                    y: reduceMotion ? 0 : 18,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.65,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="relative z-10"
                >
                  <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#d6b86f]/55">
                    Version {displayIndex}
                  </div>

                  <p
                    aria-live="polite"
                    className="mt-8 max-w-[26ch] font-serif text-[clamp(2rem,4.2vw,4.8rem)] leading-[0.98] text-[#f4f0e8]"
                  >
                    {
                      artwork.fragments[
                        currentIndex
                      ]
                    }
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-7 flex min-h-10 items-center justify-between gap-6">
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
              {history.length === 0
                ? 'archive / vide'
                : `${String(
                    history.length,
                  ).padStart(
                    2,
                    '0',
                  )} trace${
                    history.length > 1
                      ? 's'
                      : ''
                  }`}
            </span>

            {!isFinal ? (
              <button
                type="button"
                onClick={reconstruct}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#d6b86f] transition-colors duration-300 hover:text-[#f4f0e8] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#d6b86f] focus-visible:outline-offset-4"
              >
                Reconstruire
              </button>
            ) : (
              <button
                type="button"
                onClick={restart}
                className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/38 transition-colors duration-300 hover:text-[#d6b86f] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#d6b86f] focus-visible:outline-offset-4"
              >
                Reprendre depuis la première trace
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
