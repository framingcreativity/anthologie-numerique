import {
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

type Cell =
  | { type: 'fragment'; index: number }
  | { type: 'void'; key: string };

const layout: Cell[] = [
  { type: 'fragment', index: 0 },
  { type: 'void', key: 'void-a' },
  { type: 'fragment', index: 1 },

  { type: 'fragment', index: 2 },
  { type: 'void', key: 'void-b' },
  { type: 'fragment', index: 3 },

  { type: 'fragment', index: 4 },
  { type: 'void', key: 'void-c' },
  { type: 'fragment', index: 5 },
];

const masks = [
  'Le blanc ______ la trace.',
  'Une ligne ______. Le sens reste.',
  'L’intervalle est une ______.',
  'Le silence possède ______ syntaxe.',
  'Ce qui disparaît ______ d’agir.',
  'if (presence) ______();',
];

export default function AbsenceExperiment({
  artwork,
}: Props) {
  const reduceMotion = useReducedMotion();

  const [hovered, setHovered] =
    useState<number | null>(null);

  const [focused, setFocused] =
    useState<number | null>(null);

  const [pinned, setPinned] =
    useState<number | null>(null);

  const [visited, setVisited] =
    useState<Set<number>>(() => new Set());

  const [completed, setCompleted] =
    useState(false);

  useEffect(() => {
    setHovered(null);
    setFocused(null);
    setPinned(null);
    setVisited(new Set());
    setCompleted(false);
  }, [artwork.id]);

  const markVisited = (index: number) => {
    if (completed) return;

    setVisited((current) => {
      if (current.has(index)) {
        return current;
      }

      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  const isRevealed = (index: number) =>
    !completed &&
    (
      hovered === index ||
      focused === index ||
      pinned === index
    );

  const allVisited =
    visited.size === artwork.fragments.length;

  const leaveOnlyTraces = () => {
    setCompleted(true);
    setHovered(null);
    setFocused(null);
    setPinned(null);
  };

  const restart = () => {
    setCompleted(false);
    setHovered(null);
    setFocused(null);
    setPinned(null);
    setVisited(new Set());
  };

  return (
    <section
      className="border-t border-white/12 pt-10"
      aria-labelledby={`absence-${artwork.id}`}
    >
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <div>
          <div
            id={`absence-${artwork.id}`}
            className="micro-meta text-[#d6b86f]"
          >
            Interaction / absence
          </div>

          <p className="mt-4 max-w-[340px] text-sm leading-6 text-white/45">
            {artwork.interactionNote}
          </p>

          <motion.p
            initial={false}
            animate={{
              opacity: completed ? 0.18 : 1,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
            }}
            className="mt-8 max-w-[280px] font-serif text-lg italic leading-7 text-white/32"
          >
            Approcher révèle.
            <br />
            Toucher conserve.
            <br />
            S’éloigner rend au blanc.
          </motion.p>

          <div className="mt-10 max-w-[280px] border-t border-white/10 pt-5">
            <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em]">
              <span className="text-white/25">
                {completed
                  ? 'Résidu'
                  : 'Traces rencontrées'}
              </span>

              <span className="text-[#d6b86f]/70">
                {String(visited.size).padStart(2, '0')}
                {' / '}
                {String(
                  artwork.fragments.length,
                ).padStart(2, '0')}
              </span>
            </div>

            <div
              className="mt-4 grid grid-cols-6 gap-2"
              aria-hidden="true"
            >
              {artwork.fragments.map((_, index) => (
                <motion.span
                  key={index}
                  initial={false}
                  animate={{
                    opacity: completed
                      ? visited.has(index)
                        ? 0.3
                        : 0.04
                      : visited.has(index)
                        ? 0.72
                        : 0.1,

                    scaleX: completed
                      ? visited.has(index)
                        ? 0.55
                        : 0.15
                      : visited.has(index)
                        ? 1
                        : 0.35,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : completed
                        ? 1
                        : 0.45,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="h-px origin-left bg-[#d6b86f]"
                />
              ))}
            </div>
          </div>

          <div
            className="sr-only"
            aria-live="polite"
          >
            {completed
              ? 'La composition a disparu. Seules les traces du parcours restent.'
              : `${visited.size} fragments sur ${artwork.fragments.length} ont été rencontrés.`}
          </div>
        </div>

        <div>
          <motion.div
            initial={false}
            animate={{
              opacity: completed ? 0.72 : 1,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="border-y border-white/10 py-8 md:py-12"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {layout.map((cell) => {
                if (cell.type === 'void') {
                  return (
                    <div
                      key={cell.key}
                      aria-hidden="true"
                      className="hidden min-h-[150px] md:block"
                    />
                  );
                }

                const index = cell.index;

                const fragment =
                  artwork.fragments[index];

                const revealed =
                  isRevealed(index);

                const retained =
                  pinned === index;

                const hasTrace =
                  visited.has(index);

                const textOpacity = completed
                  ? hasTrace
                    ? 0.055
                    : 0.015
                  : revealed
                    ? 0.94
                    : hasTrace
                      ? 0.34
                      : 0.2;

                const lineWidth = completed
                  ? hasTrace
                    ? '16%'
                    : '3%'
                  : revealed
                    ? '58%'
                    : hasTrace
                      ? '24%'
                      : '8%';

                const lineOpacity = completed
                  ? hasTrace
                    ? 0.24
                    : 0.03
                  : revealed
                    ? 0.65
                    : hasTrace
                      ? 0.32
                      : 0.1;

                return (
                  <button
                    key={`${artwork.id}-${index}`}
                    type="button"
                    disabled={completed}
                    aria-pressed={retained}
                    aria-label={
                      completed
                        ? `Fragment ${index + 1}. Trace résiduelle.`
                        : revealed
                          ? `Fragment ${index + 1}: ${fragment}`
                          : `Révéler le fragment ${index + 1}.`
                    }
                    onMouseEnter={() => {
                      setHovered(index);
                      markVisited(index);
                    }}
                    onMouseLeave={() =>
                      setHovered((current) =>
                        current === index
                          ? null
                          : current,
                      )
                    }
                    onFocus={() => {
                      setFocused(index);
                      markVisited(index);
                    }}
                    onBlur={() =>
                      setFocused((current) =>
                        current === index
                          ? null
                          : current,
                      )
                    }
                    onClick={() => {
                      markVisited(index);

                      setPinned((current) =>
                        current === index
                          ? null
                          : index,
                      );
                    }}
                    className="relative min-h-[150px] border-l border-white/10 px-5 py-6 text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#d6b86f] focus-visible:-outline-offset-1 disabled:cursor-default"
                  >
                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={{
                        opacity: completed
                          ? 0.12
                          : 0.5,
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : 0.8,
                      }}
                      className="font-mono text-[8px] tracking-[0.16em] text-[#d6b86f]"
                    >
                      {String(index + 1).padStart(
                        2,
                        '0',
                      )}
                    </motion.span>

                    <motion.p
                      aria-hidden="true"
                      initial={false}
                      animate={{
                        opacity: textOpacity,
                        y:
                          completed
                            ? 5
                            : revealed
                              ? 0
                              : 3,
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : completed
                            ? 1.1
                            : revealed
                              ? 0.32
                              : 0.65,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                      className="mt-8 max-w-[15ch] font-serif text-[clamp(1.4rem,2vw,2rem)] leading-[1.12] text-white"
                    >
                      {completed
                        ? masks[index]
                        : revealed
                          ? fragment
                          : masks[index]}
                    </motion.p>

                    <motion.span
                      aria-hidden="true"
                      initial={false}
                      animate={{
                        width: lineWidth,
                        opacity: lineOpacity,
                      }}
                      transition={{
                        duration: reduceMotion
                          ? 0
                          : completed
                            ? 1
                            : 0.45,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                      className="absolute bottom-5 left-5 h-px bg-[#d6b86f]"
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex min-h-8 flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/18">
                {completed
                  ? 'mémoire / résiduelle'
                  : `mémoire locale / ${visited.size}`}
              </span>

              {!completed && pinned !== null && (
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                  fragment{' '}
                  {String(pinned + 1).padStart(
                    2,
                    '0',
                  )}{' '}
                  retenu
                </span>
              )}

              {!completed &&
                pinned === null &&
                !allVisited && (
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                    état / instable
                  </span>
                )}
            </div>
          </motion.div>

          {allVisited && !completed && (
            <motion.div
              initial={{
                opacity: reduceMotion ? 1 : 0,
                y: reduceMotion ? 0 : 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.7,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="mt-8 flex justify-end"
            >
              <button
                type="button"
                onClick={leaveOnlyTraces}
                className="inline-flex min-h-11 items-center py-2 text-left font-mono text-[9px] uppercase tracking-[0.18em] text-[#d6b86f] transition-colors duration-300 hover:text-[#f4f0e8] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#d6b86f] focus-visible:outline-offset-4"
              >
                Laisser disparaître
              </button>
            </motion.div>
          )}

          {completed && (
            <motion.div
              initial={{
                opacity: reduceMotion ? 1 : 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: reduceMotion ? 0 : 1.1,
                delay: reduceMotion ? 0 : 0.25,
              }}
              className="mt-10 border-t border-white/8 pt-8"
            >
              <p className="max-w-[28ch] font-serif text-xl italic leading-7 text-white/24">
                La phrase n’est plus là.
                <br />
                La lecture, elle, en garde la forme.
              </p>

              <button
                type="button"
                onClick={restart}
                className="mt-8 font-mono text-[8px] uppercase tracking-[0.18em] text-white/28 transition-colors duration-300 hover:text-[#d6b86f] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#d6b86f] focus-visible:outline-offset-4"
              >
                Recommencer l’expérience
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
