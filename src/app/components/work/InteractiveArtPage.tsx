import { createPortal } from 'react-dom';
import {
  motion,
  useReducedMotion,
} from 'motion/react';
import {
  ArrowLeft,
  X,
} from 'lucide-react';
import {
  useLayoutEffect,
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

export default function InteractiveArtPage(props: Props) {
  return props.artwork ? createPortal(
    <WorkDialog {...props} artwork={props.artwork} />,
    document.body,
  ) : null;
}

function WorkDialog({ artwork, onClose, onSelect }: Props & { artwork: Artwork }) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current!;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // The native modal makes the background inert and contains keyboard focus.
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  useLayoutEffect(() => {
    titleRef.current?.focus({ preventScroll: true });
    dialogRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [artwork.id]);

  const artworkPosition = artwork
    ? artworks.findIndex((item) => item.id === artwork.id)
    : -1;

  const displayIndex =
    artworkPosition >= 0
      ? formatArtworkIndex(artworkPosition)
      : '—';

  const totalWorks = formatArtworkTotal();


  return (
        <motion.dialog
          ref={dialogRef}
          className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-work p-0 text-ink"
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.28 }}
          aria-modal="true"
          aria-labelledby={`work-title-${artwork.id}`}
          onCancel={(event) => { event.preventDefault(); onClose(); }}
        >
          <header className="sticky top-0 z-20 border-b border-white/10 bg-work/88 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-14">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/60 transition hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
              >
                <ArrowLeft aria-hidden="true" size={15} />
                Retour à la collection
              </button>

              <button
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 shrink-0 place-items-center border border-white/15 text-white/65 transition hover:border-gold hover:text-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
                aria-label="Fermer l’étude"
              >
                <X aria-hidden="true" size={16} />
              </button>
            </div>
          </header>

          <div>
            <div className="mx-auto max-w-[1440px] px-5 pb-14 pt-10 md:px-10 md:pb-20 md:pt-16 lg:px-14">
              <section className="grid gap-10 sm:gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
                <div>
                  <div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                    <span>
                      ÉTUDE {displayIndex} / {totalWorks}
                    </span>

                    <span className="h-px w-10 bg-gold/60" />

                    <span>{artwork.chapter}</span>
                  </div>

                  <h1
                    ref={titleRef}
                    tabIndex={-1}
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
                      <span className="micro-meta text-muted">
                        Expérience
                      </span>

                      <p className="max-w-[720px] text-base leading-8 text-white/58">
                        {artwork.mainText}
                      </p>
                    </div>

                    <div className="grid gap-5 border-b border-white/12 py-6 md:grid-cols-[130px_1fr]">
                      <span className="micro-meta text-muted">
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
                <ExperimentRenderer key={artwork.id} artwork={artwork} />
              </div>

              <WorkResidue artwork={artwork} />
            </div>

            <WorkNavigation
              artwork={artwork}
              onSelect={onSelect}
            />
          </div>
        </motion.dialog>
  );
}
