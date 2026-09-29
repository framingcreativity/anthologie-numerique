import type { Artwork } from '../../data/artworks';

type Props = {
  artwork: Artwork;
};

export default function WorkFigure({ artwork }: Props) {
  return (
    <figure className="relative min-h-[300px] sm:min-h-[420px] overflow-hidden border border-white/10 bg-panel lg:min-h-[650px]">
      <img
        src={artwork.image}
        decoding="async"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-88"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/[0.04] to-black/10" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(211,177,110,.08),transparent_32%)]" />

      <figcaption className="absolute bottom-5 left-5 font-mono text-[8px] uppercase tracking-[0.17em] text-white/42">
        {artwork.medium} / {artwork.behavior}
      </figcaption>
    </figure>
  );
}
