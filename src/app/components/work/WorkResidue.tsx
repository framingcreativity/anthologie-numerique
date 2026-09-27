import type { Artwork } from '../../data/artworks';

type Props = {
  artwork: Artwork;
};

export default function WorkResidue({
  artwork,
}: Props) {
  return (
    <section
      className="mt-20 border-t border-white/12 py-16 md:py-20"
      aria-labelledby={`residue-${artwork.id}`}
    >
      <div className="grid gap-10 lg:grid-cols-[.6fr_1.4fr]">
        <div>
          <div
            id={`residue-${artwork.id}`}
            className="micro-meta text-white/32"
          >
            Résidu
          </div>

          <p className="mt-4 max-w-[340px] text-sm leading-6 text-white/38">
            Ce qui demeure après l’interaction.
          </p>
        </div>

        <div className="relative min-h-[220px] overflow-hidden border border-white/8">
          <div className="absolute left-[8%] top-[20%] h-px w-[18%] bg-white/12" />
          <div className="absolute right-[12%] top-[48%] h-px w-[11%] bg-[#d6b86f]/30" />
          <div className="absolute bottom-[18%] left-[38%] h-px w-[5%] bg-white/16" />

          <p className="absolute left-[14%] top-[42%] max-w-[20ch] font-serif text-xl italic leading-7 text-white/22">
            {artwork.consequence}
          </p>

          <span className="absolute bottom-6 right-6 font-mono text-[9px] uppercase tracking-[0.16em] text-white/18">
            {artwork.chapter} / trace
          </span>
        </div>
      </div>
    </section>
  );
}
