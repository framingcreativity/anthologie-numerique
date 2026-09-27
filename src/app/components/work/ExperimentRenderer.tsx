import {
  motion,
  useReducedMotion,
} from 'motion/react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { Artwork } from '../../data/artworks';

import AbsenceExperiment from './experiments/AbsenceExperiment';

type Props = {
  artwork: Artwork;
};

export default function ExperimentRenderer({
  artwork,
}: Props) {
  const reduceMotion = useReducedMotion();

  const [activeFragment, setActiveFragment] = useState(0);
  const [previousFragment, setPreviousFragment] =
    useState<number | null>(null);

  const recursionTimer = useRef<number | null>(null);

  useEffect(() => {
    setActiveFragment(0);
    setPreviousFragment(null);

    if (recursionTimer.current !== null) {
      window.clearTimeout(recursionTimer.current);
      recursionTimer.current = null;
    }

    return () => {
      if (recursionTimer.current !== null) {
        window.clearTimeout(recursionTimer.current);
      }
    };
  }, [artwork.id]);

  const compressedText = useMemo(() => {
    if (artwork.experience !== 'compression') {
      return '';
    }

    const stages = [
      'Le vent traverse la chambre et conserve encore la température de la saison.',
      'Le vent traverse la chambre et garde la saison.',
      'Le vent garde la saison.',
      'Le vent. La saison.',
      'Vent / saison.',
      'Vent.',
    ];

    return stages[activeFragment] ?? stages[0];
  }, [artwork.experience, activeFragment]);

  const selectFragment = (index: number) => {
    setPreviousFragment(activeFragment);

    if (
      artwork.experience === 'recursion' &&
      index === artwork.fragments.length - 1
    ) {
      setActiveFragment(index);

      if (recursionTimer.current !== null) {
        window.clearTimeout(recursionTimer.current);
      }

      recursionTimer.current = window.setTimeout(
        () => {
          setPreviousFragment(index);
          setActiveFragment(0);
        },
        reduceMotion ? 0 : 650,
      );

      return;
    }

    setActiveFragment(index);
  };

  const activeText = artwork.fragments[activeFragment];

  if (artwork.experience === 'absence') {
    return <AbsenceExperiment artwork={artwork} />;
  }

  return (
    <section
      className="border-t border-white/12 pt-10"
      aria-labelledby={`interaction-${artwork.id}`}
    >
      <div className="grid gap-10 lg:grid-cols-[.6fr_1.4fr]">
        <div>
          <div
            id={`interaction-${artwork.id}`}
            className="micro-meta text-[#d6b86f]"
          >
            Interaction
          </div>

          <p className="mt-4 max-w-[360px] text-sm leading-6 text-white/48">
            {artwork.interactionNote}
          </p>
        </div>

        <div className="panel-soft min-h-[240px] p-6 md:p-8">
          {artwork.experience === 'memory' && (
            <div className="grid min-h-[180px] gap-8 md:grid-cols-2">
              <div>
                <div className="micro-meta text-white/28">
                  Trace précédente
                </div>

                <p className="mt-6 font-serif text-2xl leading-[1.25] text-white/30">
                  {previousFragment === null
                    ? 'Aucune trace enregistrée.'
                    : artwork.fragments[previousFragment]}
                </p>
              </div>

              <div className="border-l border-white/10 pl-6">
                <div className="micro-meta text-[#d6b86f]">
                  État actuel
                </div>

                <motion.p
                  key={activeFragment}
                  initial={{
                    opacity: reduceMotion ? 1 : 0,
                    y: reduceMotion ? 0 : 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                  }}
                  className="mt-6 font-serif text-3xl leading-[1.15]"
                >
                  {activeText}
                </motion.p>
              </div>
            </div>
          )}

          {artwork.experience === 'machine' && (
            <div className="grid min-h-[180px] gap-px bg-white/10 md:grid-cols-2">
              <div className="bg-[#0c0c0c] p-5">
                <div className="micro-meta text-white/28">
                  System
                </div>

                <p className="mt-6 font-mono text-sm uppercase leading-7 tracking-[0.12em] text-white/45">
                  {activeText
                    .split(' ')
                    .map((word) => `[${word}]`)
                    .join(' ')}
                </p>
              </div>

              <div className="bg-[#0c0c0c] p-5">
                <div className="micro-meta text-[#d6b86f]">
                  Reader
                </div>

                <p className="mt-6 font-serif text-3xl leading-[1.2]">
                  {activeText}
                </p>
              </div>
            </div>
          )}

          {artwork.experience === 'recursion' && (
            <motion.div
              key={activeFragment}
              initial={{
                opacity: reduceMotion ? 1 : 0,
                x: reduceMotion ? 0 : 18,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.48,
              }}
              className="flex min-h-[180px] items-center"
            >
              <div>
                <div className="micro-meta text-[#d6b86f]">
                  Passage {String(activeFragment + 1).padStart(2, '0')}
                </div>

                <p className="mt-6 max-w-[18ch] font-serif text-4xl leading-[1.1]">
                  {activeText}
                </p>
              </div>
            </motion.div>
          )}

          {artwork.experience === 'compression' && (
            <div className="flex min-h-[180px] items-center">
              <div>
                <div className="micro-meta text-[#d6b86f]">
                  Compression / {activeFragment + 1} : {artwork.fragments.length}
                </div>

                <motion.p
                  key={compressedText}
                  initial={{
                    opacity: reduceMotion ? 1 : 0.3,
                  }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.35,
                  }}
                  className="mt-6 max-w-[22ch] font-serif text-4xl leading-[1.12]"
                >
                  {compressedText}
                </motion.p>
              </div>
            </div>
          )}

          {artwork.experience === 'error' && (
            <div className="flex min-h-[180px] items-center overflow-hidden">
              <motion.p
                key={activeFragment}
                initial={{
                  opacity: reduceMotion ? 1 : 0.2,
                  x:
                    reduceMotion
                      ? 0
                      : activeFragment % 2 === 0
                        ? 22
                        : -18,
                  y:
                    reduceMotion
                      ? 0
                      : activeFragment % 3 === 0
                        ? -7
                        : 6,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.48,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="max-w-[18ch] font-serif text-4xl leading-[1.1]"
              >
                {activeText}
              </motion.p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
        {artwork.fragments.map((fragment, index) => {
          const active = activeFragment === index;

          return (
            <button
              key={`${artwork.id}-${index}`}
              type="button"
              onClick={() => selectFragment(index)}
              aria-pressed={active}
              className={`min-h-[125px] bg-[#0c0c0c] p-5 text-left transition focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#d6b86f] focus-visible:-outline-offset-1 ${
                active
                  ? 'outline outline-1 outline-[#d6b86f] -outline-offset-1'
                  : 'hover:bg-[#121212]'
              }`}
            >
              <div className="mb-5 font-mono text-[9px] tracking-[0.15em] text-[#d6b86f]">
                {String(index + 1).padStart(2, '0')}
              </div>

              <p
                className={`text-sm leading-6 transition ${
                  active
                    ? 'text-[#f4f0e8]'
                    : 'text-white/48'
                }`}
              >
                {fragment}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
