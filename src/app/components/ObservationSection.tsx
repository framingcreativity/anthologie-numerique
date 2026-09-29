import { motion } from 'motion/react';

export default function ObservationSection() {
  return (
    <section className="border-t border-black/15 bg-[#e9e4d9] text-[#111]">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-6 md:px-10 md:pb-32 lg:px-14">
        <motion.div
          className="grid gap-12 border-t border-black/20 pt-12 lg:grid-cols-[.55fr_1.45fr]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="micro-meta text-black/40">
            Observation / 01
          </div>

          <div>
            <p className="text-base leading-7 text-black/48">
              À travers ces expériences, un même constat :
            </p>

            <p className="mt-5 max-w-[1000px] text-[clamp(2.5rem,5.4vw,6rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              Ce que nous lisons change avec la manière dont la page agit.
            </p>

            <p className="mt-8 max-w-[760px] font-serif text-xl italic leading-8 text-[#9b7836] md:text-2xl">
              Dès qu’elle peut attendre, répondre ou se souvenir,
              la page cesse d’être un simple contenant.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
