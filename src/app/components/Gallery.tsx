import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { editorialEase, motionTiming } from '../lib/motion';
import { ArrowUpRight } from 'lucide-react';

import InteractiveArtPage from './work/InteractiveArtPage';
import {
  artworks,
  formatArtworkIndex,
  formatArtworkTotal,
  type Artwork,
} from '../data/artworks';

export default function Gallery() {
  const reduceMotion = useReducedMotion();
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
            <div className="mb-5 micro-meta text-editorial-muted">
              Collection / {total} études
            </div>

            <h2 className="text-[clamp(3.3rem,7vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.065em]">
              Pages-
              <br />
              œuvres
            </h2>

            <p className="mt-7 max-w-[34ch] text-sm leading-6 text-editorial-muted">
              Chaque œuvre met à l’épreuve une manière différente
              de lire. Certaines demandent d’attendre, d’autres de
              choisir, de recommencer ou simplement d’observer ce
              qui change.
            </p>
          </div>

          <div className="max-w-[720px] lg:justify-self-end">
            <p className="text-base leading-7 text-editorial-muted lg:text-lg">
              Une collection ouverte. Une question commune.
            </p>

            <p className="mt-4 font-serif text-[clamp(1.65rem,2.5vw,2.5rem)] italic leading-[1.2] text-editorial-gold">
              <span className="block">
                Que devient l’écriture
              </span>

              <span className="block">
                lorsque la page cesse d’être immobile ?
              </span>
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-px bg-black/20 md:grid-cols-2 lg:grid-cols-3">
          {artworks.map((work, index) => (
            <motion.article
              key={work.id}
              className="group digital-frame relative min-h-[520px] overflow-hidden bg-panel text-left text-white"
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: reduceMotion ? 0 : motionTiming.reveal,
                delay: reduceMotion ? 0 : Math.min(index * 0.05, 0.24),
                ease: editorialEase,
              }}
            >
              <img
                src={work.image}
                loading="lazy"
                decoding="async"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-62 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-76"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,.06)_0%,rgba(5,5,5,.26)_42%,rgba(5,5,5,.86)_100%)]" />


              <div className="relative flex h-full min-h-[520px] flex-col justify-between p-6 md:p-7">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.18em] text-gold-highlight">
                      ÉTUDE {formatArtworkIndex(index)} / {total}
                    </span>

                    <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-2">
                      {work.chapter}
                    </div>
                  </div>

                  <span className="grid h-9 w-9 place-items-center border border-white/18 text-white/62 transition group-hover:border-gold-highlight group-hover:text-gold-highlight">
                    <ArrowUpRight aria-hidden="true" size={16} />
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

                  <h3 id={`card-${work.id}`} className="max-w-[11ch] text-[2.65rem] font-medium leading-[0.95] tracking-[-0.05em]">
                    {work.title}
                  </h3>

                  <p className="mt-3 font-serif text-xl italic text-gold-highlight">
                    {work.subtitle}
                  </p>

                  <p className="mt-5 max-w-[36ch] text-sm leading-6 text-white/55">
                    {work.preview}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-labelledby={`card-${work.id}`}
                aria-haspopup="dialog"
                onClick={() => setActive(work)}
                className="absolute inset-0 z-10 cursor-pointer focus-visible:-outline-offset-4"
              />
            </motion.article>
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
