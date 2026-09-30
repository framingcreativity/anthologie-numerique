import { editorialEase, motionTiming } from '../lib/motion';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import aboutExperience from '../../assets/anthologie/about-experience.webp';
import Header from './Header';
import PageMeta from './PageMeta';
import Footer from './Footer';

export default function AboutPage() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative min-h-screen bg-bg text-ink selection:bg-gold selection:text-black">
      <PageMeta page="about" />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.68]"
        style={{
          backgroundImage: `url(${aboutExperience})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(5,5,5,0.46) 0%, rgba(5,5,5,0.54) 46%, rgba(5,5,5,0.66) 100%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(5,5,5,0.08) 0%, rgba(5,5,5,0.05) 42%, rgba(5,5,5,0.26) 100%)',
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        <main id="main-content" tabIndex={-1} className="flex-1">
          <section className="mx-auto max-w-[1440px] px-5 pb-20 pt-32 md:px-10 md:pb-28 md:pt-36 lg:px-14 lg:py-36">
            <div className="grid gap-14 lg:grid-cols-[.62fr_1.38fr] lg:gap-24">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : motionTiming.standard,
                  ease: editorialEase,
                }}
              >
                <div className="micro-meta text-gold">
                  À propos
                </div>

                <h1 className="mt-7 max-w-[8ch] text-[clamp(3.6rem,8vw,7.4rem)] font-medium leading-[0.87] tracking-[-0.065em]">
                  Pourquoi cette expérience.
                </h1>
              </motion.div>

              <motion.div
                className="lg:pt-20"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  delay: reduceMotion ? 0 : 0.08,
                  ease: editorialEase,
                }}
              >
                <p className="max-w-[820px] font-serif text-2xl leading-[1.38] text-white/88 md:text-3xl">
                  J’ai créé Anthologie numérique pour
                  explorer ce qui arrive à une œuvre lorsque
                  le numérique ne sert plus seulement à la
                  montrer, mais commence à participer à sa
                  forme.
                </p>

                <div className="mt-10 max-w-[760px] space-y-6 text-base leading-7 text-white/58 md:text-lg md:leading-8">
                  <p>
                    Le texte, l’image et l’interaction y
                    sont pensés comme une seule forme de
                    lecture.
                  </p>

                  <p>
                    Le mouvement, l’absence, la mémoire,
                    la répétition, la transformation et
                    l’erreur ne sont pas des effets ajoutés
                    au texte. Ils deviennent une partie de
                    ce qui se lit.
                  </p>

                  <p>
                    Anthologie numérique reste une
                    expérimentation autonome, inscrite
                    dans une pratique artistique plus
                    large développée sous le nom de
                    J-ART.
                  </p>
                </div>

                <div className="mt-14 border-t border-gold/45 pt-8">
                  <div className="micro-meta font-semibold tracking-[0.2em] text-gold">
                    Pratique artistique
                  </div>

                  <p className="mt-4 max-w-[600px] text-sm leading-6 text-muted">
                    Pour découvrir l’ensemble de mon
                    travail, mes autres projets et ma
                    démarche.
                  </p>

                  <a
                    href="https://framing-creativity.ch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex min-h-11 flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.17em] text-gold transition-[transform,color,letter-spacing] duration-300 ease-out hover:translate-x-1.5 hover:tracking-[0.205em] hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
                  >
                    <span>
                      Découvrir mon portfolio
                    </span>

                    <span className="text-muted transition-colors duration-300 group-hover:text-gold">
                      Framing Creativity
                    </span>

                    <ArrowUpRight aria-hidden="true"
                      size={15}
                      className="transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1.5"
                    />
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
