import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from 'motion/react';
import {
  ArrowLeft,
  X,
} from 'lucide-react';
import {
  useEffect,
  useRef,
} from 'react';

import {
  artworks,
  formatArtworkIndex,
  formatArtworkTotal,
  type Artwork,
} from '../../data/artworks';

import ExperimentRenderer from './ExperimentRenderer';
import WorkFigure from './WorkFigure';
import WorkNavigation from './WorkNavigation';
import WorkResidue from './WorkResidue';

type Props = {
  artwork: Artwork | null;
  onClose: () => void;
  onSelect: (artwork: Artwork) => void;
};

export default function InteractiveArtPage({
  artwork,
  onClose,
  onSelect,
}: Props) {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!artwork) return;

    previousFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);

      window.requestAnimationFrame(() => {
        previousFocus.current?.focus();
      });
    };
  }, [artwork, onClose]);

  useEffect(() => {
    if (!artwork) return;

    scrollRef.current?.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, [artwork?.id]);

  const artworkPosition = artwork
    ? artworks.findIndex((item) => item.id === artwork.id)
    : -1;

  const displayIndex =
    artworkPosition >= 0
      ? formatArtworkIndex(artworkPosition)
      : '—';

  const totalWorks = formatArtworkTotal();


  // ANTHOLOGIE_FOCUS_TRAP
  useEffect(() => {
    if (!artwork) return;

    const root = scrollRef.current;

    if (!root) return;

    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const getFocusable = () =>
      Array.from(
        root.querySelectorAll<HTMLElement>(
          selector,
        ),
      ).filter((element) => {
        const style =
          window.getComputedStyle(element);

        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          element.getClientRects().length > 0 &&
          element.getAttribute('aria-hidden') !==
            'true'
        );
      });

    const trapFocus = (
      event: KeyboardEvent,
    ) => {
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();

      if (focusable.length === 0) {
        event.preventDefault();
        root.focus();
        return;
      }

      const first = focusable[0];
      const last =
        focusable[focusable.length - 1];

      const active =
        document.activeElement;

      if (
        event.shiftKey &&
        (
          active === first ||
          !root.contains(active)
        )
      ) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (
        !event.shiftKey &&
        active === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    root.addEventListener(
      'keydown',
      trapFocus,
    );

    return () => {
      root.removeEventListener(
        'keydown',
        trapFocus,
      );
    };
  }, [artwork]);

  return (
    <AnimatePresence mode="wait">
      {artwork && (
        <motion.div
          ref={scrollRef}
        tabIndex={-1}
          key={artwork.id}
          className="fixed inset-0 z-[80] overflow-x-hidden overflow-y-auto overscroll-contain bg-work text-ink"
          initial={{
            opacity: reduceMotion ? 1 : 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: reduceMotion ? 1 : 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.28,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`work-title-${artwork.id}`}
        >
          <header className="sticky top-0 z-20 border-b border-white/10 bg-work/88 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-14">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/60 transition hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
              >
                <ArrowLeft size={15} />
                Retour à la collection
              </button>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center border border-white/15 text-white/65 transition hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
                aria-label="Fermer l’étude"
              >
                <X size={16} />
              </button>
            </div>
          </header>

          <main>
            <div className="mx-auto max-w-[1440px] px-5 pb-14 pt-10 md:px-10 md:pb-20 md:pt-16 lg:px-14">
              <section className="grid gap-10 sm:gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
                <div>
                  <div className="mb-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    <span>
                      ÉTUDE {displayIndex} / {totalWorks}
                    </span>

                    <span className="h-px w-10 bg-gold/60" />

                    <span>{artwork.chapter}</span>
                  </div>

                  <h1
                    id={`work-title-${artwork.id}`}
                    className="max-w-[10ch] text-[clamp(3rem,15vw,8rem)] font-medium leading-[0.85] tracking-[-0.065em]"
                  >
                    {artwork.title}
                  </h1>

                  <p className="mt-5 font-serif text-2xl italic text-gold md:text-3xl">
                    {artwork.subtitle}
                  </p>

                  <div className="mt-12 border-t border-white/12">
                    <div className="grid gap-5 border-b border-white/12 py-6 md:grid-cols-[130px_1fr]">
                      <span className="micro-meta text-gold">
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

                      <p className="font-serif text-xl italic leading-7 text-gold">
                        {artwork.consequence}
                      </p>
                    </div>
                  </div>
                </div>

                <WorkFigure artwork={artwork} />
              </section>

              <div className="mt-20">
                <ExperimentRenderer artwork={artwork} />
              </div>

              <WorkResidue artwork={artwork} />
            </div>

            <WorkNavigation
              artwork={artwork}
              onSelect={onSelect}
            />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
