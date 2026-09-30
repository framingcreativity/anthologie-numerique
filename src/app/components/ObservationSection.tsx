import { motion, useReducedMotion } from 'motion/react';

export default function ObservationSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-editorial text-editorial-ink">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-6 md:px-10 md:pb-32 lg:px-14">
        <motion.div
          className="grid gap-12 border-t border-editorial-gold/45 pt-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="micro-meta text-editorial-muted">
              Observation / 01
            </div>

            <p className="mt-8 max-w-[760px] text-[clamp(2.5rem,5vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              Ce que nous lisons change avec la manière dont la page agit.
            </p>
          </div>

          <div className="lg:pt-1">
            <p className="text-base leading-7 text-editorial-muted">
              À travers ces expériences, un même constat :
            </p>

            <p className="mt-8 max-w-[760px] font-serif text-xl italic leading-8 text-editorial-gold md:text-2xl">
              Dès qu’elle peut attendre, répondre ou se souvenir,
              la page cesse d’être un simple contenant.
            </p>

            <div className="mt-10 max-w-[720px] space-y-5 text-base leading-7 text-editorial-muted">
              <p>
                Chaque étude part d’un geste simple : retirer,
                répéter, ralentir, compresser ou laisser une erreur
                agir. Le sens ne vient plus seulement de ce qui est
                écrit, mais aussi de la manière dont l’interface
                organise l’attente, le rythme et la transformation.
              </p>

              <p>
                Le numérique devient alors une matière de lecture.
                Il ne sert pas à illustrer le texte : il modifie les
                conditions dans lesquelles celui-ci apparaît,
                disparaît, se recompose ou résiste. C’est dans cet
                écart entre contenu et comportement que se construit
                l’anthologie.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
