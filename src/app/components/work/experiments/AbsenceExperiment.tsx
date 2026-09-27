import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

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

  const isRevealed = (index: number) =>
    hovered === index ||
    focused === index ||
    pinned === index;

  return (
    <section
      className="border-t border-white/12 pt-10"
      aria-labelledby={`absence-${artwork.id}`}
    >
      <div className="grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
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

          <p className="mt-8 max-w-[280px] font-serif text-lg italic leading-7 text-white/28">
            Approcher révèle.
            <br />
            Toucher conserve.
            <br />
            S’éloigner rend au blanc.
          </p>
        </div>

        <div className="border-y border-white/10 py-8 md:py-12">
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

              return (
                <button
                  key={`${artwork.id}-${index}`}
                  type="button"
                  aria-pressed={retained}
                  aria-label={
                    retained
                      ? `Fragment ${index + 1}. Révélation conservée.`
                      : `Révéler le fragment ${index + 1}.`
                  }
                  onMouseEnter={() =>
                    setHovered(index)
                  }
                  onMouseLeave={() =>
                    setHovered((current) =>
                      current === index
                        ? null
                        : current,
                    )
                  }
                  onFocus={() =>
                    setFocused(index)
                  }
                  onBlur={() =>
                    setFocused((current) =>
                      current === index
                        ? null
                        : current,
                    )
                  }
                  onClick={() =>
                    setPinned((current) =>
                      current === index
                        ? null
                        : index,
                    )
                  }
                  className="relative min-h-[150px] border-l border-white/10 px-5 py-6 text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#d6b86f] focus-visible:-outline-offset-1"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[8px] tracking-[0.16em] text-[#d6b86f]/50"
                  >
                    {String(index + 1).padStart(
                      2,
                      '0',
                    )}
                  </span>

                  <motion.p
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      opacity: revealed
                        ? 0.92
                        : 0.2,
                      y: revealed ? 0 : 3,
                    }}
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : revealed
                          ? 0.32
                          : 0.5,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    className="mt-8 max-w-[15ch] font-serif text-[clamp(1.4rem,2vw,2rem)] leading-[1.12] text-white"
                  >
                    {revealed
                      ? fragment
                      : masks[index]}
                  </motion.p>

                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{
                      width: revealed
                        ? '58%'
                        : '10%',
                      opacity: revealed
                        ? 0.65
                        : 0.12,
                    }}
                    transition={{
                      duration: reduceMotion
                        ? 0
                        : 0.4,
                    }}
                    className="absolute bottom-5 left-5 h-px bg-[#d6b86f]"
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex justify-end">
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
              {pinned !== null
                ? `fragment ${String(
                    pinned + 1,
                  ).padStart(2, '0')} retenu`
                : 'état / instable'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
