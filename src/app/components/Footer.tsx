export default function Footer() {
  return (
    <footer className="bg-[#080808] text-[#f4f0e8]">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-10 md:grid-cols-[1fr_auto] md:items-end md:px-10 lg:px-14">
        <div>
          <div className="text-sm font-semibold tracking-[0.22em]">
            ANTHOLOGIE NUMÉRIQUE
          </div>

          <p className="mt-3 max-w-[600px] text-xs leading-5 text-white/38">
            Concept, direction & digital experience — J-ART
          </p>
        </div>

        <div className="text-left md:text-right">
          <div className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#d6b86f]">
            ÉDITION 01 · 2026
          </div>

          <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/25">
            Littérature × Interface × Système
          </div>
        </div>
      </div>
    </footer>
  );
}
