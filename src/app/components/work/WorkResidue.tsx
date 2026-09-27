import type { Artwork } from '../../data/artworks';

type Props = {
  artwork: Artwork;
};

export default function WorkResidue({
  artwork,
}: Props) {
  return (
    <section
      className="mt-16 border-t border-white/10 pt-10 md:mt-20"
      aria-labelledby={`residue-${artwork.id}`}
    >
      <div className="grid gap-10 lg:grid-cols-[.48fr_1.52fr]">
        <div>
          <div
            id={`residue-${artwork.id}`}
            className="micro-meta text-white/28"
          >
            Résidu
          </div>

          <p className="mt-4 max-w-[260px] text-sm leading-6 text-white/34">
            Ce qui demeure après
            l’interaction.
          </p>
        </div>

        <div className="relative min-h-[210px] overflow-hidden border border-white/8 bg-white/[0.008]">
          <div
            aria-hidden="true"
            className="absolute left-[8%] top-[20%] h-px w-[12%] bg-white/10"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-[18%] right-[8%] h-px w-[8%] bg-[#d6b86f]/28"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-[18%] left-[26%] h-px w-[4%] bg-white/8"
          />

          <div className="relative flex min-h-[210px] items-center px-7 py-10 md:px-12">
            <blockquote className="max-w-[34ch]">
              <p className="font-serif text-[clamp(1.35rem,2vw,2rem)] italic leading-[1.3] text-white/30">
                {artwork.residue}
              </p>
            </blockquote>
          </div>

          <div className="absolute bottom-5 right-5 font-mono text-[7px] uppercase tracking-[0.18em] text-white/16">
            {artwork.chapter} / trace
          </div>
        </div>
      </div>
    </section>
  );
}
