import Footer from './Footer';
import Header from './Header';
import PageMeta from './PageMeta';

type LegalKind =
  | 'legal'
  | 'privacy'
  | 'terms';

const pages = {
  legal: {
    eyebrow: 'Informations légales',
    title: 'Mentions légales',
    description:
      'Informations relatives à l’édition, à l’hébergement et aux droits associés à Anthologie numérique.',
    canonical: '/mentions-legales/',
    sections: [
      {
        title: 'Édition',
        text:
          'Anthologie numérique est un projet artistique, éditorial et numérique développé sous le nom de J-ART. Les informations d’identification et de contact légal requises devront être complétées avant la publication définitive.',
      },
      {
        title: 'Hébergement',
        text:
          'L’infrastructure de publication du site repose sur GitHub Pages. Les traitements techniques propres à cet hébergement relèvent également des conditions et politiques du fournisseur.',
      },
      {
        title: 'Propriété intellectuelle',
        text:
          'Sauf mention contraire, les textes, images, compositions, interfaces, concepts éditoriaux et expériences présentés sur Anthologie numérique sont protégés par les règles applicables en matière de propriété intellectuelle.',
      },
      {
        title: 'Liens externes',
        text:
          'Certains liens peuvent conduire vers des services ou sites tiers. Leur contenu, leur disponibilité et leurs politiques propres relèvent de leurs éditeurs respectifs.',
      },
    ],
  },

  privacy: {
    eyebrow: 'Données & vie privée',
    title: 'Confidentialité',
    description:
      'Informations relatives à la confidentialité et au traitement des données techniques sur Anthologie numérique.',
    canonical: '/confidentialite/',
    sections: [
      {
        title: 'Principe',
        text:
          'Anthologie numérique est conçu comme une expérience éditoriale publique. Les interactions proposées dans l’interface servent avant tout au fonctionnement et à la lecture des œuvres numériques.',
      },
      {
        title: 'Données techniques',
        text:
          'Comme pour tout site web, certaines données techniques peuvent être traitées par l’infrastructure d’hébergement afin d’acheminer les requêtes, sécuriser le service et permettre son fonctionnement.',
      },
      {
        title: 'Interactions',
        text:
          'Certaines expériences peuvent utiliser temporairement l’état du navigateur pour produire leur comportement interactif. Ces mécanismes font partie du fonctionnement de l’œuvre numérique.',
      },
      {
        title: 'Services externes',
        text:
          'Lorsqu’un lien conduit vers un service externe, les traitements éventuels réalisés après avoir quitté Anthologie numérique sont régis par les politiques du service concerné.',
      },
    ],
  },

  terms: {
    eyebrow: 'Cadre d’utilisation',
    title: 'Conditions d’utilisation',
    description:
      'Conditions d’accès et d’utilisation du projet éditorial et artistique Anthologie numérique.',
    canonical: '/conditions-utilisation/',
    sections: [
      {
        title: 'Objet',
        text:
          'Anthologie numérique est une œuvre et une expérience éditoriale interactive. Son architecture, ses textes et ses comportements peuvent évoluer avec le développement artistique et technique du projet.',
      },
      {
        title: 'Consultation',
        text:
          'Le site peut être consulté à des fins personnelles, culturelles, critiques, documentaires ou pédagogiques dans le respect des droits applicables.',
      },
      {
        title: 'Réutilisation',
        text:
          'Toute reproduction ou réutilisation substantielle des contenus doit respecter la propriété intellectuelle applicable ainsi que les règles relatives à la citation et à l’attribution.',
      },
      {
        title: 'Vente et paiement',
        text:
          'La version actuelle d’Anthologie numérique n’intègre pas de fonctionnalité de vente ou de paiement. Des conditions générales de vente distinctes ne sont donc pas intégrées à cette version du site.',
      },
    ],
  },
} as const;

export default function LegalPage({
  kind,
}: {
  kind: LegalKind;
}) {
  const page = pages[kind];

  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-gold selection:text-black">
      <PageMeta
        title={`${page.title} — Anthologie numérique`}
        description={page.description}
        canonicalPath={page.canonical}
        robots="noindex,nofollow"
      />

      <Header />

      <main
        id="main-content"
        className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40 lg:px-14"
      >
        <article
          aria-labelledby="legal-title"
          className="grid gap-14 lg:grid-cols-[.62fr_1.38fr] lg:gap-24"
        >
          <header>
            <p className="micro-meta text-gold">
              {page.eyebrow}
            </p>

            <h1
              id="legal-title"
              className="mt-7 max-w-[10ch] text-[clamp(3rem,6vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.06em]"
            >
              {page.title}
            </h1>

            <p className="mt-8 max-w-[38ch] text-sm leading-6 text-white/55">
              Anthologie numérique · Édition 01 · 2026
            </p>
          </header>

          <div className="lg:pt-14">
            {page.sections.map(
              (section, index) => (
                <section
                  key={section.title}
                  className={
                    index === 0
                      ? ''
                      : 'mt-12 border-t border-white/10 pt-10'
                  }
                >
                  <h2 className="font-serif text-[clamp(1.6rem,2.3vw,2.3rem)] font-normal leading-[1.15] tracking-[-0.025em] text-ink">
                    {section.title}
                  </h2>

                  <p className="mt-5 max-w-[720px] text-base leading-7 text-white/65">
                    {section.text}
                  </p>
                </section>
              ),
            )}

            <p className="mt-14 border-t border-gold/30 pt-6 font-mono text-[9px] uppercase tracking-[0.15em] text-white/38">
              Version éditoriale · 29 septembre 2026
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
