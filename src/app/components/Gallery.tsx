import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

import InteractiveArtPage from './work/InteractiveArtPage';
import {
  artworks,
  formatArtworkIndex,
  formatArtworkTotal,
  type Artwork,
} from '../data/artworks';

export default function Gallery() {
  const [active, setActive] = useState<Artwork | null>(null);
  const total = formatArtworkTotal();

  return (
    <section
      id="pages"
      className="section-light"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32 lg:px-14">
        <div className="grid gap-10 border-b border-black/20 pb-12 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div>
            <div className="mb-5 micro-meta text-black/42">
              Collection / {total} études
            </div>

            <h2 className="text-[clamp(3.3rem,7vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.065em]">
              Pages-
              <br />
              œuvres
            </h2>
          </div>

          <div className="max-w-[720px] lg:justify-self-end">
            <p className="text-base leading-7 text-black/58 lg:text-lg">
              Une collection ouverte. Une même question.
            </p>

            <p className="mt-4 font-serif text-[clamp(1.65rem,2.5vw,2.5rem)] italic leading-[1.2] text-[#a9853e]">
              <span className="block">
                Que devient l’écriture
              </span>

              <span className="block">
                quand l’interface participe réellement à la lecture ?
              </span>
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-px bg-black/20 md:grid-cols-2 lg:grid-cols-3">
          {artworks.map((work, index) => (
            <motion.button
              key={work.id}
              type="button"
              className="group digital-frame digital-noise relative min-h-[520px] overflow-hidden bg-[#0d0d0d] text-left text-white"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.55,
                delay: Math.min(index * 0.05, 0.24),
              }}
              onClick={() => setActive(work)}
            >
              <img
                src={work.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale transition duration-700 group-hover:scale-[1.025] group-hover:opacity-42"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.12)_0%,rgba(5,5,5,.38)_38%,rgba(5,5,5,.90)_100%)]" />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(214,184,111,.11),transparent_28%)]" />

              <div className="relative flex h-full min-h-[520px] flex-col justify-between p-6 md:p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[#e3ca87]">
                      ÉTUDE {formatArtworkIndex(index)} / {total}
                    </span>

                    <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/32">
                      {work.chapter}
                    </div>
                  </div>

                  <span className="grid h-9 w-9 place-items-center border border-white/18 text-white/62 transition group-hover:border-[#e3ca87] group-hover:text-[#e3ca87]">
                    <ArrowUpRight size={16} />
                  </span>
                </div>

                <div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="micro-meta border border-white/14 px-2.5 py-1 text-white/55">
                      {work.medium}
                    </span>

                    <span className="micro-meta border border-white/14 px-2.5 py-1 text-white/55">
                      {work.behavior}
                    </span>
                  </div>

                  <div className="mb-5 h-px w-full bg-white/10" />

                  <h3 className="max-w-[11ch] text-[2.65rem] font-medium leading-[0.95] tracking-[-0.05em]">
                    {work.title}
                  </h3>

                  <p className="mt-3 font-serif text-xl italic text-[#e3ca87]">
                    {work.subtitle}
                  </p>

                  <p className="mt-5 max-w-[36ch] text-sm leading-6 text-white/55">
                    {work.preview}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <InteractiveArtPage
        artwork={active}
        onClose={() => setActive(null)}
        onSelect={setActive}
      />
    </section>
  );
}
