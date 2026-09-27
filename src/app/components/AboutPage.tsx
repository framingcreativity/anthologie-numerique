import {
  ArrowLeft,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'motion/react';

import aboutExperience from '../../assets/anthologie/about-experience.png';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f4f0e8] selection:bg-[#d6b86f] selection:text-black">
      <header className="border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-14">
          <a
            href="#algorithmiques"
            className="group inline-flex min-h-11 items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/48 transition hover:text-[#d6b86f] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#d6b86f] focus-visible:outline-offset-4"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />

            Retour à l’anthologie
          </a>

          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/22">
            J-ART
          </span>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28 lg:px-14 lg:py-36">
          <div className="grid gap-14 lg:grid-cols-[.62fr_1.38fr] lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="micro-meta text-[#d6b86f]">
                À propos
              </div>

              <h1 className="mt-7 max-w-[8ch] text-[clamp(3.6rem,8vw,7.4rem)] font-medium leading-[0.87] tracking-[-0.065em]">
                Pourquoi cette expérience.
              </h1>

              {/* ABOUT_EXPERIENCE_IMAGE */}
              <figure className="mt-14 max-w-[560px] overflow-hidden border border-white/10 bg-[#0b0b0b]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={aboutExperience}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.82]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.02)_0%,rgba(8,8,8,0.08)_58%,rgba(8,8,8,0.28)_100%)]"
                  />
                </div>
              </figure>
            </motion.div>

            <motion.div
              className="lg:pt-20"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="max-w-[820px] font-serif text-2xl leading-[1.38] text-white/88 md:text-3xl">
                Anthologie numérique est une série
                d’expériences où le texte, l’image et
                l’interaction sont pensés comme une
                seule forme de lecture.
              </p>

              <div className="mt-10 max-w-[760px] space-y-6 text-base leading-7 text-white/58 md:text-lg md:leading-8">
                <p>
                  Ce projet est né d’une envie simple :
                  explorer ce que le numérique peut
                  apporter à une œuvre lorsqu’il ne sert
                  pas uniquement à la montrer, mais
                  qu’il participe réellement à sa forme.
                </p>

                <p>
                  Ici, le mouvement, l’absence, la
                  mémoire, la répétition, la
                  transformation ou encore l’erreur
                  deviennent des éléments de lecture à
                  part entière. Chaque œuvre conserve
                  une structure commune, tout en
                  développant sa propre manière
                  d’exister à l’écran.
                </p>

                <p>
                  Anthologie numérique est une
                  expérimentation autonome, inscrite
                  dans une pratique artistique plus
                  large développée sous le nom de
                  J-ART.
                </p>
              </div>

              <div className="mt-14 border-t border-white/12 pt-8">
                <div className="micro-meta text-white/28">
                  Pratique artistique
                </div>

                <p className="mt-4 max-w-[600px] text-sm leading-6 text-white/42">
                  Pour découvrir l’ensemble de mon
                  travail, mes autres projets et ma
                  démarche.
                </p>

                <a
                  href="https://framing-creativity.ch"
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-8 inline-flex min-h-11 items-center gap-4 border-b border-[#d6b86f]/45 pb-2 font-mono text-[10px] uppercase tracking-[0.17em] text-[#d6b86f] transition hover:border-[#d6b86f] hover:text-[#f4f0e8] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#d6b86f] focus-visible:outline-offset-4"
                >
                  Découvrir mon portfolio
                  <span className="text-white/38">
                    Framing Creativity
                  </span>

                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-7 md:px-10 lg:px-14">
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/20">
            Anthologie numérique
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/20">
            Expérience éditoriale
          </span>
        </div>
      </footer>
    </div>
  );
}
