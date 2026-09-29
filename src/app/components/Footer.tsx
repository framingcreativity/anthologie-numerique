import { withBase } from '../lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-gold/35 bg-bg/88 text-ink backdrop-blur-[2px]">
      <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 lg:px-14">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="text-sm font-semibold tracking-[0.22em]">
              ANTHOLOGIE NUMÉRIQUE
            </div>

            <p className="mt-3 max-w-[600px] text-xs leading-5 text-white/38">
              Concept, direction artistique & expérience numérique — J-ART
            </p>
          </div>

          <div className="text-left md:text-right">
            <div className="font-mono text-[9px] uppercase tracking-[0.17em] text-gold">
              ÉDITION 01 · 2026
            </div>

            <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/25">
              Littérature × Interface × Système
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-gold/20 pt-6 md:flex-row md:items-center md:justify-between">
          <nav
            aria-label="Pages légales"
            className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[8px] uppercase tracking-[0.16em] text-white/38"
          >
            <a
              href={withBase('mentions-legales/')}
              className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
            >
              Mentions légales
            </a>

            <a
              href={withBase('confidentialite/')}
              className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
            >
              Confidentialité
            </a>

            <a
              href={withBase('conditions-utilisation/')}
              className="inline-flex min-h-11 items-center transition-colors duration-300 hover:text-gold focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold focus-visible:outline-offset-4"
            >
              Conditions d’utilisation
            </a>
          </nav>

          <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/28">
            © 2026 J-ART. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
}
