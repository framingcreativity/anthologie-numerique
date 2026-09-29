import {
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

import {
  artworks,
  formatArtworkIndex,
  type Artwork,
} from '../../data/artworks';

type Props = {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
};

export default function WorkNavigation({
  artwork,
  onSelect,
}: Props) {
  const currentIndex = artworks.findIndex(
    (item) => item.id === artwork.id,
  );

  const previous =
    currentIndex > 0
      ? artworks[currentIndex - 1]
      : null;

  const next =
    currentIndex >= 0 &&
    currentIndex < artworks.length - 1
      ? artworks[currentIndex + 1]
      : null;

  return (
    <nav
      className="grid border-t border-white/12 md:grid-cols-2"
      aria-label="Navigation entre les études"
    >
      <div className="border-b border-white/12 md:border-b-0 md:border-r">
        {previous ? (
          <button
            type="button"
            onClick={() => onSelect(previous)}
            className="group flex min-h-[112px] sm:min-h-[138px] w-full items-center gap-5 p-5 text-left sm:p-6 transition hover:bg-white/[0.018] focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:-outline-offset-1 md:p-8"
          >
            <ArrowLeft aria-hidden="true"
              size={17}
              className="text-gold transition-transform group-hover:-translate-x-1"
            />

            <div>
              <div className="micro-meta text-white/28">
                Étude précédente
              </div>

              <div className="mt-3 max-w-[22ch] text-lg leading-6 md:text-xl">
                {formatArtworkIndex(currentIndex - 1)} — {previous.title}
              </div>
            </div>
          </button>
        ) : (
          <div className="flex min-h-[112px] sm:min-h-[138px] items-center p-6 md:p-8">
            <span className="micro-meta text-white/18">
              Début du corpus
            </span>
          </div>
        )}
      </div>

      <div>
        {next ? (
          <button
            type="button"
            onClick={() => onSelect(next)}
            className="group flex min-h-[112px] sm:min-h-[138px] w-full items-center justify-end gap-5 p-5 text-right sm:p-6 transition hover:bg-white/[0.018] focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:-outline-offset-1 md:p-8"
          >
            <div>
              <div className="micro-meta text-white/28">
                Étude suivante
              </div>

              <div className="mt-3 max-w-[22ch] text-lg leading-6 md:text-xl">
                {formatArtworkIndex(currentIndex + 1)} — {next.title}
              </div>
            </div>

            <ArrowRight aria-hidden="true"
              size={17}
              className="text-gold transition-transform group-hover:translate-x-1"
            />
          </button>
        ) : (
          <div className="flex min-h-[112px] sm:min-h-[138px] items-center justify-end p-5 text-right sm:p-6 md:p-8">
            <span className="micro-meta text-white/18">
              Fin du corpus actuel
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}
