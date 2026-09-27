import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import {
  artworks,
  formatArtworkIndex,
  formatArtworkTotal,
  type Artwork,
} from '../data/artworks';

type Props = {
  artwork: Artwork | null;
  onClose: () => void;
};

export default function InteractiveArtPage({
  artwork,
  onClose,
}: Props) {
  const [activeFragment, setActiveFragment] = useState(0);
  const [previousFragment, setPreviousFragment] = useState<number | null>(null);

  useEffect(() => {
    if (!artwork) return;

    setActiveFragment(0);
    setPreviousFragment(null);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [artwork, onClose]);

  const compressedText = useMemo(() => {
    if (!artwork || artwork.id !== 'compressed-season') {
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
  }, [artwork, activeFragment]);

  if (!artwork) return null;

  const artworkPosition = artworks.findIndex(
    (item) => item.id === artwork.id,
  );

  const displayIndex = formatArtworkIndex(
    Math.max(artworkPosition, 0),
  );

  const totalWorks = formatArtworkTotal();

  const selectFragment = (index: number) => {
    setPreviousFragment(activeFragment);

    if (
      artwork.id === 'recursive-letter' &&
      index === artwork.fragments.length - 1
    ) {
      setActiveFragment(index);

      window.setTimeout(() => {
        setPreviousFragment(index);
        setActiveFragment(0);
      }, 650);

      return;
    }

    setActiveFragment(index);
  };

  const activeText = artwork.fragments[activeFragment];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] overflow-y-auto bg-[#090909] text-[#f4f0e8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        role="dialog"
        aria-modal="true"
        aria-label={artwork.title}
      >
        <div className="sticky top-0 z-20 border-b border-white/10 bg-[#090909]/88 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-14">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/60 transition hover:text-white"
            >
              <ArrowLeft size={15} />
              Retour à la collection
            </button>

            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center border border-white/15 text-white/65 transition hover:border-[#d6b86f] hover:text-[#d6b86f]"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-16 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
            <div>
              <div className="mb-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d6b86f]">
                <span>ÉTUDE {displayIndex} / {totalWorks}</span>
                <span className="h-px w-10 bg-[#d6b86f]/60" />
                <span>{artwork.chapter}</span>
              </div>

              <h2 className="max-w-[10ch] text-[clamp(3.6rem,8vw,8rem)] font-medium leading-[0.85] tracking-[-0.065em]">
                {artwork.title}
              </h2>

              <p className="mt-5 font-serif text-2xl italic text-[#d6b86f] md:text-3xl">
                {artwork.subtitle}
              </p>

              <div className="mt-12 border-t border-white/12">
                <div className="grid gap-5 border-b border-white/12 py-6 md:grid-cols-[130px_1fr]">
                  <span className="micro-meta text-[#d6b86f]">
                    Hypothèse
                  </span>

                  <p className="font-serif text-xl leading-7 text-white/82 md:text-2xl">
                    {artwork.hypothesis}
                  </p>
                </div>

                <div className="grid gap-5 border-b border-white/12 py-6 md:grid-cols-[130px_1fr]">
                  <span className="micro-meta text-white/36">
                    Expérience
                  </span>

                  <p className="max-w-[720px] text-base leading-8 text-white/58">
                    {artwork.mainText}
                  </p>
                </div>

                <div className="grid gap-5 border-b border-white/12 py-6 md:grid-cols-[130px_1fr]">
                  <span className="micro-meta text-white/36">
                    Conséquence
                  </span>

                  <p className="font-serif text-xl italic leading-7 text-[#d6b86f]">
                    {artwork.consequence}
                  </p>
                </div>
              </div>
            </div>

            <figure className="relative min-h-[420px] overflow-hidden border border-white/10 lg:min-h-[650px]">
              <img
                src={artwork.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-72 grayscale"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15" />

              <figcaption className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
                {artwork.medium} / {artwork.behavior}
              </figcaption>
            </figure>
          </div>

          <div className="mt-20 border-t border-white/12 pt-10">
            <div className="grid gap-10 lg:grid-cols-[.6fr_1.4fr]">
              <div>
                <div className="micro-meta text-[#d6b86f]">
                  Interaction
                </div>

                <p className="mt-4 max-w-[360px] text-sm leading-6 text-white/48">
                  {artwork.interactionNote}
                </p>
              </div>

              <div className="panel-soft min-h-[240px] p-6 md:p-8">
                {artwork.id === 'syntax-of-absence' && (
                  <motion.div
                    key={activeFragment}
                    initial={{ opacity: 0.08 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.1 }}
                    className="flex min-h-[180px] items-center"
                  >
                    <p className="max-w-[15ch] font-serif text-4xl leading-[1.08] text-[#f4f0e8] md:text-5xl">
                      {activeText}
                    </p>
                  </motion.div>
                )}

                {artwork.id === 'memory-matrix' && (
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
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 font-serif text-3xl leading-[1.15]"
                      >
                        {activeText}
                      </motion.p>
                    </div>
                  </div>
                )}

                {artwork.id === 'machine-reading' && (
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

                {artwork.id === 'recursive-letter' && (
                  <motion.div
                    key={activeFragment}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
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

                {artwork.id === 'compressed-season' && (
                  <div className="flex min-h-[180px] items-center">
                    <div>
                      <div className="micro-meta text-[#d6b86f]">
                        Compression / {activeFragment + 1} : 6
                      </div>

                      <motion.p
                        key={compressedText}
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 max-w-[22ch] font-serif text-4xl leading-[1.12]"
                      >
                        {compressedText}
                      </motion.p>
                    </div>
                  </div>
                )}

                {artwork.id === 'error-garden' && (
                  <div className="flex min-h-[180px] items-center overflow-hidden">
                    <motion.p
                      key={activeFragment}
                      initial={{
                        opacity: 0.2,
                        x: activeFragment % 2 === 0 ? 22 : -18,
                        y: activeFragment % 3 === 0 ? -7 : 6,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.48,
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
              {artwork.fragments.map((fragment, index) => (
                <button
                  key={fragment}
                  type="button"
                  onClick={() => selectFragment(index)}
                  className={`min-h-[125px] bg-[#0c0c0c] p-5 text-left transition ${
                    activeFragment === index
                      ? 'outline outline-1 outline-[#d6b86f] -outline-offset-1'
                      : 'hover:bg-[#121212]'
                  }`}
                >
                  <div className="mb-5 font-mono text-[9px] tracking-[0.15em] text-[#d6b86f]">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <p
                    className={`text-sm leading-6 transition ${
                      activeFragment === index
                        ? 'text-[#f4f0e8]'
                        : 'text-white/48'
                    }`}
                  >
                    {fragment}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
