import type { Artwork } from '../../data/artworks';

type Props = {
  artwork: Artwork;
};

export default function WorkFigure({ artwork }: Props) {
  return (
    <figure className="relative min-h-[420px] overflow-hidden border border-white/10 lg:min-h-[650px]">
      <img
        src={artwork.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-72 grayscale"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(211,177,110,.08),transparent_32%)]" />

      <figcaption className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
        {artwork.medium} / {artwork.behavior}
      </figcaption>
    </figure>
  );
}
