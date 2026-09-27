import type { Artwork } from '../../../data/artworks';

type Props = {
  artwork: Artwork;
};

type Cell =
  | { type: 'fragment'; index: number }
  | { type: 'void'; key: string };

const layout: Cell[] = [
  { type: 'fragment', index: 0 },
  { type: 'void', key: 'void-a' },
  { type: 'fragment', index: 1 },

  { type: 'fragment', index: 2 },
  { type: 'void', key: 'void-b' },
  { type: 'fragment', index: 3 },

  { type: 'fragment', index: 4 },
  { type: 'void', key: 'void-c' },
  { type: 'fragment', index: 5 },
];

export default function AbsenceExperiment({
  artwork,
}: Props) {
  return (
    <section
      className="border-t border-white/12 pt-10"
      aria-labelledby={`absence-${artwork.id}`}
    >
      <div className="grid gap-10 lg:grid-cols-[.55fr_1.45fr]">
        <div>
          <div
            id={`absence-${artwork.id}`}
            className="micro-meta text-[#d6b86f]"
          >
            Interaction / absence
          </div>

          <p className="mt-4 max-w-[340px] text-sm leading-6 text-white/45">
            {artwork.interactionNote}
          </p>

          <p className="mt-8 max-w-[280px] font-serif text-lg italic leading-7 text-white/28">
            Ici, le blanc n’est pas un manque de contenu.
            Il fait partie de la lecture.
          </p>
        </div>

        <div className="border-y border-white/10 py-8 md:py-12">
          <div className="grid gap-6 md:grid-cols-3">
            {layout.map((cell) => {
              if (cell.type === 'void') {
                return (
                  <div
                    key={cell.key}
                    aria-hidden="true"
                    className="hidden min-h-[150px] md:block"
                  />
                );
              }

              const fragment =
                artwork.fragments[cell.index];

              return (
                <article
                  key={`${artwork.id}-${cell.index}`}
                  className="relative min-h-[150px] border-l border-white/10 px-5 py-6"
                >
                  <span className="font-mono text-[8px] tracking-[0.16em] text-[#d6b86f]/50">
                    {String(cell.index + 1).padStart(2, '0')}
                  </span>

                  <p className="mt-8 max-w-[15ch] font-serif text-[clamp(1.4rem,2vw,2rem)] leading-[1.12] text-white/72">
                    {fragment}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
