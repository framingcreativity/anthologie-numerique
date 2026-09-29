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

const mutations = [
  {
    type: 'duplication',
    text: 'Le système suit suit la règle.',
    detail: 'Un élément apparaît deux fois.',
  },
  {
    type: 'omission',
    text: 'Le système suit la ___.',
    detail: 'Une unité attendue n’est plus disponible.',
  },
  {
    type: 'inversion',
    text: 'La règle suit le système.',
    detail: 'Les positions restent valides. Leur relation change.',
  },
  {
    type: 'interruption',
    text: 'Le système suit —',
    detail: 'L’instruction s’arrête avant sa résolution.',
  },
  {
    type: 'collision',
    text: 'Le système suit la règle / l’erreur montre le système.',
    detail: 'Deux sorties occupent désormais le même espace logique.',
  },
  {
    type: 'répétition',
    text: 'règle règle règle / unexpected token: beauty',
    detail: 'La répétition produit quelque chose qui n’était pas prévu.',
  },
];

export default function ErrorExperiment({
  artwork,
}: Props) {
  const reduceMotion = useReducedMotion();

  const [stage, setStage] =
    useState(0);

  const isInitial = stage === 0;

  const isFinal =
    stage === mutations.length;

  const current =
    isInitial
      ? {
          type: 'ordre',
          text: 'Le système suit la règle.',
          detail:
            'Tous les éléments occupent la position attendue.',
        }
      : mutations[stage - 1];

  const introduceError = () => {
    if (isFinal) return;

    setStage((currentStage) =>
      Math.min(
        currentStage + 1,
        mutations.length,
      ),
    );
  };

  const reset = () => {
    setStage(0);
  };

  const descendants =
    mutations.slice(0, stage);

  return (
    <section
      className="border-t border-white/12 pt-10"
      aria-labelledby={`error-${artwork.id}`}
    >
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[.46fr_1.54fr]">
        <div>
          <h2
            id={`error-${artwork.id}`}
            className="micro-meta text-gold"
          >
            Interaction / erreur
          </h2>

          <p className="mt-4 max-w-[330px] text-sm leading-6 text-white/45">
            {artwork.interactionNote}
          </p>

          <p className="mt-8 max-w-[280px] font-serif text-lg italic leading-7 text-white/30">
            Ne pas corriger.
            <br />
            Observer ce que l’écart
            rend soudain visible.
          </p>

          <div className="mt-10 max-w-[285px] border-t border-white/10 pt-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                Descendants
              </span>

              <span className="font-mono text-[9px] text-gold/70">
                {String(stage).padStart(2, '0')}
                {' / '}
                {String(
                  mutations.length,
                ).padStart(2, '0')}
              </span>
            </div>

            <div
              className="mt-4 grid grid-cols-6 gap-2"
              aria-hidden="true"
            >
              {mutations.map((_, index) => (
                <motion.span
                  key={index}
                  initial={false}
                  animate={{
                    opacity:
                      index < stage
                        ? 0.75
                        : 0.08,
                    scaleX:
                      index < stage
                        ? 1
                        : 0.3,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.18,
                  }}
                  className="h-px origin-left bg-gold"
                />
              ))}
            </div>

            <div className="mt-7">
              <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/18">
                État
              </div>

              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/34">
                {isInitial
                  ? 'stable'
                  : isFinal
                    ? 'ramifié'
                    : current.type}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          >
            {current.text}{' '}
            {isInitial
              ? 'État initial stable.'
              : `Erreur ${stage} sur ${mutations.length}: ${current.type}.`}
            {stage > 0
              ? ` ${stage} descendant${stage > 1 ? 's' : ''} conservé${stage > 1 ? 's' : ''}.`
              : ''}
            {isFinal
              ? ' Structure entièrement exposée.'
              : ''}
          </div>

          <div className="relative overflow-hidden border-y border-white/10">
            <div className="grid min-h-[340px] sm:min-h-[410px] lg:grid-cols-[1.05fr_.95fr]">
              <div className="relative flex min-h-[310px] items-center border-b border-white/10 px-5 py-10 lg:border-b-0 lg:border-r lg:px-9">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-1/2 h-px bg-white/[0.025]"
                />

                <motion.div
                  key={stage}
                  initial={{
                    opacity: reduceMotion
                      ? 1
                      : 0.18,
                    x: reduceMotion
                      ? 0
                      : stage % 2 === 0
                        ? -14
                        : 14,
                    y: reduceMotion
                      ? 0
                      : stage % 3 === 0
                        ? -5
                        : 5,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  transition={{
                    duration: reduceMotion
                      ? 0
                      : 0.18,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <span className="micro-meta text-gold/55">
                      {isInitial
                        ? 'Source / intacte'
                        : `Erreur / ${current.type}`}
                    </span>

                    <span
                      aria-hidden="true"
                      className="h-px w-8 bg-gold/30"
                    />
                  </div>

                  <p
                    className="mt-10 max-w-[19ch] break-words font-serif text-[clamp(2.05rem,4.2vw,4.9rem)] leading-[0.96] text-ink"
                  >
                    {current.text}
                  </p>

                  <p className="mt-9 max-w-[36ch] text-sm leading-6 text-white/26">
                    {current.detail}
                  </p>
                </motion.div>
              </div>

              <div className="min-h-[310px] px-5 py-8 lg:px-8 lg:py-10">
                <div className="micro-meta text-white/25">
                  Descendance / trace
                </div>

                {descendants.length === 0 ? (
                  <p className="mt-8 max-w-[24ch] font-serif text-lg italic leading-7 text-white/18">
                    Aucun écart.
                    Le système ne révèle encore
                    rien de sa structure.
                  </p>
                ) : (
                  <div className="relative mt-8 border-l border-white/10 pl-6">
                    {descendants.map(
                      (mutation, index) => {
                        const fragment =
                          artwork.fragments[
                            Math.min(
                              index,
                              artwork.fragments.length - 1,
                            )
                          ];

                        return (
                          <motion.div
                            key={mutation.type}
                            initial={{
                              opacity:
                                reduceMotion
                                  ? 1
                                  : 0,
                              x:
                                reduceMotion
                                  ? 0
                                  : -7,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              duration:
                                reduceMotion
                                  ? 0
                                  : 0.28,
                            }}
                            className="relative pb-7 last:pb-0"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute -left-6 top-2 h-px w-4 bg-gold/30"
                            />

                            <div className="font-mono text-[7px] uppercase tracking-[0.16em] text-gold/45">
                              {String(
                                index + 1,
                              ).padStart(
                                2,
                                '0',
                              )}
                              {' / '}
                              {mutation.type}
                            </div>

                            <p className="mt-2 max-w-[28ch] font-serif text-base leading-6 text-white/34">
                              {fragment}
                            </p>
                          </motion.div>
                        );
                      },
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-7 flex min-h-10 flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/18">
              {isInitial
                ? 'règle / visible'
                : isFinal
                  ? 'structure / exposée'
                  : `écart / ${String(
                      stage,
                    ).padStart(2, '0')}`}
            </span>

            {!isFinal ? (
              <button
                type="button"
                onClick={introduceError}
                className="inline-flex min-h-11 items-center py-2 text-left font-mono text-[9px] uppercase tracking-[0.18em] text-gold transition-colors duration-150 hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
              >
                Introduire l’écart suivant
              </button>
            ) : (
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-11 items-center py-2 text-left font-mono text-[9px] uppercase tracking-[0.18em] text-white/36 transition-colors duration-150 hover:text-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
              >
                Restaurer la règle
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
                duration: reduceMotion
                  ? 0
                  : 0.6,
              }}
              className="mt-10 max-w-[31ch] font-serif text-xl italic leading-7 text-white/26"
            >
              La règle était presque invisible.
              <br />
              Il a fallu la rompre
              pour voir sa forme.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
