import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="section-gold"
    >
      <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28 lg:px-14">
        <motion.div
          className="grid gap-12 lg:grid-cols-[1.18fr_.82fr] lg:items-end"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="mb-6 micro-meta text-black/52">
              Épilogue
            </div>

            <h2 className="max-w-[13ch] text-[clamp(3.3rem,7vw,7.3rem)] font-medium leading-[0.9] tracking-[-0.07em] text-black">
              <span className="block">
                Une anthologie à
              </span>

              <span className="block">
                parcourir, pas seulement
              </span>

              <span className="block">
                à lire.
              </span>
            </h2>
          </div>

          <div className="border-t border-black/25 pt-7 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0">
            <p className="text-base leading-7 text-black/62">
              Ces études ne cherchent pas à habiller le texte
              autrement.
            </p>

            <p className="mt-5 text-base leading-7 text-black/62">
              Elles posent une question plus simple :
            </p>

            <p className="discipline-writing-text mt-5 font-serif text-2xl italic leading-[1.3] text-black/88">
              que se passe-t-il lorsque la page commence à répondre ?
            </p>

            <a
              href="#fragments"
              className="group mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.17em]"
            >
              Revenir au début

              <span className="grid h-9 w-9 place-items-center border border-black/35 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                <ArrowUpRight aria-hidden="true" size={15} />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
