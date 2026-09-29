import { editorialEase, motionTiming } from '../lib/motion';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';

import heroImage from '../../assets/anthologie/hero-anthologie-numerique.webp';

const principles = [
  {
    code: '01',
    text: 'Le code comme matière.',
  },
  {
    code: '02',
    text: 'Le fragment comme forme.',
  },
  {
    code: '03',
    text: 'La lecture comme action.',
  },
];

const layers = [
  {
    label: 'TEXT / VARIABLE',
    tone: 'writing',
  },
  {
    label: 'INTERFACE / ACTIVE',
    tone: 'code',
  },
  {
    label: 'BEHAVIOR / CONDITIONAL',
    tone: 'code',
  },
];

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="fragments"
      className="editorial-grid scan-overlay discipline-dual relative min-h-screen overflow-hidden border-b border-white/10 bg-bg pt-[var(--header-height)]"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          fetchPriority="high"
          decoding="async"
          alt=""
          className="h-full w-full object-cover opacity-[0.12] grayscale"
        />

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,.98)_0%,rgba(8,8,8,.93)_38%,rgba(8,8,8,.65)_68%,rgba(8,8,8,.92)_100%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(214,184,111,.14),transparent_28%)]" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-[6vw] w-px bg-white/[0.06]" />
      <div className="pointer-events-none absolute inset-y-0 right-[6vw] w-px bg-white/[0.06]" />

      <div className="relative z-[1] mx-auto grid min-h-[calc(100vh-var(--header-height))] max-w-[1440px] grid-cols-1 items-end gap-10 px-5 pb-10 pt-16 md:px-10 lg:grid-cols-[1.35fr_.65fr] lg:px-14 lg:pb-14 lg:pt-20">
        <div className="max-w-[980px]">
          <motion.div
            className="mb-8 flex flex-wrap items-center gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : motionTiming.standard, delay: reduceMotion ? 0 : 0.12 }}
          >
            <span className="data-label">
              Littérature × Interface × Système
            </span>

            <span className="micro-meta border border-gold/35 px-2.5 py-1 text-gold">
              Édition 01
            </span>
          </motion.div>

          <motion.h1
            className="max-w-[1000px] text-[clamp(3rem,10vw,9.5rem)] font-medium leading-[0.82] tracking-[-0.075em] text-ink"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : motionTiming.slow,
              delay: reduceMotion ? 0 : 0.2,
              ease: editorialEase,
            }}
          >
            <span className="discipline-code-text">
              Anthologie
            </span>

            <span className="discipline-writing-text block font-serif italic font-normal tracking-[-0.04em] text-gold">
              numérique.
            </span>
          </motion.h1>

          <motion.div
            className="mt-10 grid max-w-[900px] gap-8 border-t border-white/15 pt-7 md:grid-cols-[1fr_auto]"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.58 }}
          >
            <p className="max-w-[720px] text-base leading-7 text-white/62 md:text-lg md:leading-8">
              Une collection d’expériences éditoriales où lire signifie
              aussi attendre, choisir, perdre, recommencer. Ici, l’interface
              ne présente pas seulement le texte : elle agit avec lui.
            </p>

            <a
              href="#pages"
              className="group inline-flex items-center gap-3 self-start text-xs uppercase tracking-[0.18em] text-ink"
            >
              Explorer

              <span className="grid h-9 w-9 place-items-center border border-gold/55 text-gold transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
                <ArrowDownRight aria-hidden="true" size={16} />
              </span>
            </a>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-3 md:grid-cols-3"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.78 }}
          >
            {layers.map((item) => (
              <div
                key={item.label}
                className={`micro-meta px-4 py-3 text-white/46 ${
                  item.tone === 'writing'
                    ? 'discipline-writing-panel'
                    : 'discipline-code-panel'
                }`}
              >
                {item.label}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.aside
          className="panel-soft self-end p-5 lg:p-6"
          initial={reduceMotion ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.8 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="micro-meta text-white/38">
              Index / principes
            </div>

            <div className="micro-meta text-gold">
              03
            </div>
          </div>

          <div>
            {principles.map((principle) => (
              <div
                key={principle.code}
                className="grid grid-cols-[42px_1fr] border-b border-white/10 py-4 first:border-t"
              >
                <span className="font-mono text-[10px] text-gold">
                  {principle.code}
                </span>

                <span className="text-sm text-white/72">
                  {principle.text}
                </span>
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
