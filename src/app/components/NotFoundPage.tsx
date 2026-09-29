import {
  ArrowUpRight,
} from 'lucide-react';

import Footer from './Footer';
import Header from './Header';
import PageMeta from './PageMeta';

import {
  withBase,
} from '../lib/site';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#080808] text-[#f4f0e8]">
      <PageMeta
        title="Page introuvable — Anthologie numérique"
        description="La page demandée n’existe pas ou n’est plus disponible."
        robots="noindex,nofollow"
      />

      <Header />

      <main
        id="main-content"
        className="mx-auto flex w-full max-w-[1440px] flex-1 items-center px-5 pb-24 pt-32 md:px-10 lg:px-14"
      >
        <div>
          <p className="micro-meta text-[#d6b86f]">
            Erreur 404
          </p>

          <h1 className="mt-7 max-w-[10ch] text-[clamp(3.6rem,8vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.065em]">
            Cette page a disparu.
          </h1>

          <p className="mt-8 max-w-[560px] text-base leading-7 text-white/65">
            L’adresse demandée ne correspond à aucune page active de l’Anthologie.
          </p>

          <a
            href={withBase()}
            className="group mt-10 inline-flex min-h-11 items-center gap-3 py-2 font-mono text-[10px] uppercase tracking-[0.17em] text-[#d6b86f] transition hover:text-[#f4f0e8]"
          >
            Retour à l’anthologie

            <ArrowUpRight
              size={15}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
