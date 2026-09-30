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
    sections: [
      {
        title: 'Édition',
        text:
          'Anthologie numérique est un projet artistique, éditorial et numérique publié sous le nom de J-ART. Le responsable de publication est J-ART. Contact : j-art@framing-creativity.ch. Toute autre information d’identification légalement requise sera complétée avant la publication définitive lorsque cela sera applicable.',
      },
      {
        title: 'Hébergement',
        text:
          'Le site Anthologie numérique est hébergé au moyen de GitHub Pages, service d’hébergement statique fourni par GitHub, Inc., 88 Colin P. Kelly Jr. St., San Francisco, CA 94107, États-Unis. La disponibilité, la sécurité et les opérations techniques relevant de cette infrastructure sont également soumises aux conditions, politiques et limitations propres à GitHub.',
      },
      {
        title: 'Propriété intellectuelle',
        text:
          'Sauf mention contraire, les textes, images, compositions, interfaces, concepts éditoriaux, éléments graphiques et expériences interactives présentés sur Anthologie numérique sont protégés par les règles applicables en matière de propriété intellectuelle. Toute reproduction, adaptation, extraction, diffusion ou réutilisation substantielle en dehors des exceptions prévues par le droit applicable nécessite l’autorisation préalable du titulaire des droits.',
      },
      {
        title: 'Responsabilité et disponibilité',
        text:
          'Les contenus et expériences sont proposés dans un cadre artistique, culturel et éditorial. L’éditeur veille à leur cohérence et à leur fonctionnement, sans pouvoir garantir une disponibilité permanente, l’absence totale d’erreurs ou une compatibilité avec tous les équipements et navigateurs. Sous réserve des dispositions impératives applicables, l’éditeur ne saurait être tenu responsable des interruptions temporaires, des dysfonctionnements provenant de services tiers ou d’un usage du site contraire à sa destination.',
      },
      {
        title: 'Liens externes',
        text:
          'Le site peut contenir des liens vers des services ou sites tiers. Ces liens sont proposés à titre de référence ou de prolongement éditorial. L’éditeur ne contrôle ni leur contenu, ni leur disponibilité, ni leurs pratiques propres. Dès que l’utilisateur quitte Anthologie numérique, l’utilisation du service tiers relève de ses propres conditions et politiques.',
      },
    ],
  },

  privacy: {
    eyebrow: 'Données & vie privée',
    title: 'Confidentialité',
    sections: [
      {
        title: 'Principe',
        text:
          'Anthologie numérique est conçu comme une expérience éditoriale publique. Les interactions proposées dans l’interface ont pour finalité première le fonctionnement des œuvres et leur lecture. Le projet n’a pas pour objet d’établir un profil commercial de ses visiteurs.',
      },
      {
        title: 'Données techniques',
        text:
          'Anthologie numérique ne met pas en œuvre, dans sa version actuelle, de dispositif destiné à établir un profil commercial de ses visiteurs. L’hébergement du site repose toutefois sur GitHub Pages. GitHub indique que, lorsqu’un site GitHub Pages est consulté, l’adresse IP du visiteur est journalisée et conservée à des fins de sécurité, que le visiteur soit connecté ou non à GitHub. Les traitements réalisés directement par GitHub relèvent de ses propres politiques de confidentialité et de sécurité.',
      },
      {
        title: 'Interactions et état du navigateur',
        text:
          'Certaines expériences peuvent utiliser temporairement l’état du navigateur afin de produire leur comportement interactif, par exemple pour conserver une étape de lecture ou faire évoluer une séquence pendant la consultation. Ces mécanismes appartiennent au fonctionnement de l’œuvre et ne doivent pas être interprétés comme la création d’un profil personnel.',
      },
      {
        title: 'Services externes',
        text:
          'Lorsqu’un lien conduit vers un service externe, les éventuels traitements de données réalisés après avoir quitté Anthologie numérique relèvent du service concerné. Il appartient alors à l’utilisateur de consulter, lorsqu’elles sont pertinentes, les informations de confidentialité propres à ce service.',
      },
      {
        title: 'Évolution de la notice',
        text:
          'Cette notice peut évoluer si les fonctionnalités du projet, son infrastructure technique ou les services utilisés sont modifiés. Toute évolution substantielle devra être reflétée dans cette page afin que les informations publiées restent cohérentes avec le fonctionnement réel du site.',
      },
    ],
  },

  terms: {
    eyebrow: 'Cadre d’utilisation',
    title: 'Conditions d’utilisation',
    sections: [
      {
        title: 'Objet',
        text:
          'Anthologie numérique est une œuvre et une expérience éditoriale interactive. Son architecture, ses textes, ses images et ses comportements peuvent évoluer avec le développement artistique et technique du projet. L’accès au site implique l’acceptation de son fonctionnement éditorial et interactif dans sa version disponible au moment de la consultation.',
      },
      {
        title: 'Accès et disponibilité',
        text:
          'La consultation du site est proposée à des fins personnelles, culturelles, critiques, documentaires ou pédagogiques. Son hébergement technique repose sur GitHub Pages. L’accès peut être temporairement interrompu pour des raisons de maintenance, d’évolution technique, de sécurité, de limitation du service ou en raison d’un incident affectant GitHub ou un autre prestataire externe.',
      },
      {
        title: 'Responsabilités de l’utilisateur',
        text:
          'L’utilisateur demeure responsable de son équipement, de sa connexion, de sa navigation et de l’usage qu’il fait des contenus. Il s’engage à ne pas perturber volontairement le fonctionnement du site, tenter d’accéder sans autorisation à des ressources techniques ou utiliser les contenus d’une manière portant atteinte aux droits de l’éditeur, des auteurs ou de tiers.',
      },
      {
        title: 'Propriété intellectuelle et réutilisation',
        text:
          'La consultation du site ne transfère aucun droit de propriété intellectuelle à l’utilisateur. Toute reproduction ou réutilisation substantielle doit respecter les droits applicables ainsi que les règles relatives à la citation, à l’attribution et à l’intégrité des œuvres. Les usages permis par la loi demeurent naturellement réservés.',
      },
      {
        title: 'Liens et services tiers',
        text:
          'Anthologie numérique peut renvoyer vers des services externes. L’éditeur ne peut garantir leur disponibilité, leur sécurité, leur contenu ni leurs pratiques. Toute utilisation d’un service tiers intervient sous la responsabilité de l’utilisateur et selon les conditions propres à ce service.',
      },
      {
        title: 'Vente et paiement',
        text:
          'La version actuelle d’Anthologie numérique n’intègre aucune fonctionnalité de vente ou de paiement. Aucune commande, transaction commerciale ou obligation de paiement n’est donc conclue directement par l’intermédiaire de cette version du site.',
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
      <PageMeta page={kind} />

      <Header />

      <main
        id="main-content"
        tabIndex={-1}
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

            <p className="mt-8 max-w-[38ch] text-sm leading-6 text-muted">
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
                      : 'mt-12 border-t border-gold/35 pt-10'
                  }
                >
                  <h2 className="font-serif text-[clamp(1.6rem,2.3vw,2.3rem)] font-normal leading-[1.15] tracking-[-0.025em] text-ink">
                    {section.title}
                  </h2>

                  <p className="mt-5 max-w-[760px] text-base leading-7 text-muted">
                    {section.text}
                  </p>
                </section>
              ),
            )}

            <p className="mt-14 border-t border-gold/45 pt-6 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-2">
              Version éditoriale · 30 septembre 2026
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
