import {
  useEffect,
  lazy,
  Suspense,
} from 'react';

const AboutPage = lazy(() => import('./components/AboutPage'));
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PageMeta from './components/PageMeta';
import Gallery from './components/Gallery';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
const LegalPage = lazy(() => import('./components/LegalPage'));
import NotFoundPage from './components/NotFoundPage';
import ObservationSection from './components/ObservationSection';

import {
  getRoutePath,
  withBase,
} from './lib/site';

const LEGACY_ABOUT_HASH =
  '#a-propos';

type Route =
  | 'home'
  | 'about'
  | 'legal'
  | 'privacy'
  | 'terms'
  | '404';

function resolveRoute(): Route {
  const pathname = getRoutePath();

  switch (pathname) {
    case '/':
      return 'home';

    case '/a-propos/':
      return 'about';

    case '/mentions-legales/':
      return 'legal';

    case '/confidentialite/':
      return 'privacy';

    case '/conditions-utilisation/':
      return 'terms';

    default:
      return '404';
  }
}

export default function App() {
  return (
    <Suspense fallback={<><Header /><main id="main-content" tabIndex={-1} className="min-h-screen px-5 pt-32"><p role="status">Chargement de la page…</p></main><Footer /></>}>
      <SiteContent />
    </Suspense>
  );
}

function SiteContent() {
  const route = resolveRoute();
  useEffect(
    () => {
      const migrateLegacyAbout =
        () => {
          if (
            getRoutePath() === '/' &&
            window.location.hash ===
              LEGACY_ABOUT_HASH
          ) {
            window.location.replace(
              withBase(
                'a-propos/',
              ),
            );
          }
        };

      migrateLegacyAbout();

      window.addEventListener(
        'hashchange',
        migrateLegacyAbout,
      );

      return () => {
        window.removeEventListener(
          'hashchange',
          migrateLegacyAbout,
        );
      };
    },
    [],
  );

  useEffect(
    () => {
      const scrollToHash =
        () => {
          if (
            getRoutePath() !== '/'
          ) {
            return;
          }

          const hash =
            window.location.hash;

          if (
            !hash ||
            hash ===
              LEGACY_ABOUT_HASH
          ) {
            return;
          }

          let id: string;
          try {
            id = decodeURIComponent(hash.slice(1));
          } catch {
            return;
          }
          document.getElementById(id)?.scrollIntoView({ block: 'start' });
        };

      scrollToHash();

      window.addEventListener(
        'hashchange',
        scrollToHash,
      );

      return () => {
        window.removeEventListener(
          'hashchange',
          scrollToHash,
        );
      };
    },
    [],
  );

  if (route === 'about') {
    return <AboutPage />;
  }

  if (route === 'legal') {
    return <LegalPage kind="legal" />;
  }

  if (route === 'privacy') {
    return <LegalPage kind="privacy" />;
  }

  if (route === 'terms') {
    return <LegalPage kind="terms" />;
  }

  if (route === '404') {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-gold selection:text-black">
      <PageMeta
        title="Anthologie numérique — Expérience éditoriale interactive"
        description="Anthologie numérique explore la littérature, l’image, l’interface et le code à travers six expériences interactives."
        canonicalPath="/"
      />

      <Header />

      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <Gallery />
        <ObservationSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
