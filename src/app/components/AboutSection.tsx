import { withBase } from '../lib/site';
import { editorialEase, motionTiming } from '../lib/motion';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const principles = [
  {
    index: '01',
    title: 'Écrire avec l’espace',
    text:
      'La mise en page ne décore pas le texte. Elle règle son rythme, ses coupures et ses silences.',
  },

  {
    index: '02',
    title: 'Rendre le système visible',
    text:
      'Le code et la règle ne restent pas toujours en coulisses. Par moments, l’œuvre laisse voir ce qui la fait agir.',
  },

  {
    index: '03',
    title: 'Laisser une résistance',
    text:
      'Une interface n’a pas toujours à simplifier. Elle peut ralentir, interrompre ou déplacer la lecture lorsqu’une résistance produit du sens.',
  },
];

const layers = [
  {
    label: 'TEXT',
    tone: 'writing',
  },
  {
    label: 'INTERFACE',
    tone: 'code',
  },
  {
    label: 'BEHAVIOR',
    tone: 'code',
  },
];

export default function AboutSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="algorithmiques"
      className="editorial-grid discipline-dual relative border-y border-white/10 bg-secondary"
    >
      <div className="relative z-[1] mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: reduceMotion ? 0 : motionTiming.standard,
              ease: editorialEase,
            }}
          >
            <div className="mb-6 micro-meta text-gold">
              Principes / expérience
            </div>

            <h2 className="max-w-[8ch] text-[clamp(3.2rem,6vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.065em] text-ink">
              <span className="discipline-code-text block">
                Le numérique
              </span>

              <span className="block">
                n’est pas un
              </span>

              <span className="block">
                support neutre.
              </span>
            </h2>

            <p className="mt-7 max-w-[34ch] text-sm leading-6 text-muted">
              Une interface impose toujours une temporalité, une
              distance et une façon de regarder. Même les gestes les
              plus discrets — attendre, faire défiler, cliquer ou
              revenir — participent à la construction du sens.
            </p>
          </motion.div>

          <div className="lg:pt-20">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : motionTiming.standard,
                delay: reduceMotion ? 0 : 0.08,
                ease: editorialEase,
              }}
            >
              <p className="max-w-[860px] font-serif text-2xl leading-[1.35] text-white/84 md:text-3xl">
                <span className="block">
                  Une phrase imprimée et une phrase interactive
                </span>

                <span className="block">
                  n’habitent pas le même monde.
                </span>
              </p>

              <div className="mt-8 max-w-[860px] border-l border-gold/45 pl-6 md:pl-8">
                <p className="font-serif text-2xl leading-[1.35] text-white/66 md:text-3xl">
                  L’une est fixée.
                </p>

                <p className="discipline-writing-text mt-3 font-serif text-2xl italic leading-[1.35] text-gold md:text-3xl">
                  L’autre peut attendre, réagir, disparaître, bifurquer.
                </p>
              </div>

              <p className="mt-9 max-w-[760px] text-base leading-7 text-muted">
                Quand l’interface agit, elle ne contient plus seulement
                le texte. Elle prend part à ce qu’il devient.
              </p>
            </motion.div>

            <div className="mt-14 border-t border-white/12">
              {principles.map((principle, index) => (
                <motion.article
                  key={principle.index}
                  className="grid gap-4 border-b border-white/12 py-7 md:grid-cols-[70px_1fr_1.2fr] md:items-start"
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduceMotion ? 0 : motionTiming.reveal,
                    delay: reduceMotion ? 0 : index * 0.08,
                    ease: editorialEase,
                  }}
                >
                  <span className="font-mono text-[10px] text-gold">
                    {principle.index}
                  </span>

                  <h3 className="text-xl font-medium tracking-[-0.02em] text-white/88">
                    {principle.title}
                  </h3>

                  <p className="text-sm leading-6 text-white/62">
                    {principle.text}
                  </p>
                </motion.article>
              ))}
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {layers.map((item) => (
                <div
                  key={item.label}
                  className={`micro-meta px-4 py-3 text-muted ${
                    item.tone === 'writing'
                      ? 'discipline-writing-panel'
                      : 'discipline-code-panel'
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-white/12 pt-8">
              <a
                href={withBase('a-propos/')}
                className="group inline-flex min-h-11 items-center gap-4 font-mono text-[10px] uppercase tracking-[0.17em] text-gold transition hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
              >
                À propos de l’expérience

                <span className="grid h-9 w-9 place-items-center border border-gold/40 transition group-hover:border-gold">
                  <ArrowUpRight aria-hidden="true"
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
