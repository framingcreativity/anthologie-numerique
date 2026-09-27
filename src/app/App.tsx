import {
  useEffect,
  useState,
} from 'react';

import AboutPage from './components/AboutPage';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ObservationSection from './components/ObservationSection';

const ABOUT_HASH = '#a-propos';

function getView() {
  return window.location.hash === ABOUT_HASH
    ? 'about'
    : 'home';
}

export default function App() {
  const [view, setView] = useState<
    'home' | 'about'
  >(getView);

  useEffect(() => {
    const syncView = () => {
      setView(getView());
    };

    window.addEventListener(
      'hashchange',
      syncView,
    );

    return () => {
      window.removeEventListener(
        'hashchange',
        syncView,
      );
    };
  }, []);

  useEffect(() => {
    if (view === 'about') {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });

      return;
    }

    const hash = window.location.hash;

    if (
      hash &&
      hash !== ABOUT_HASH
    ) {
      window.requestAnimationFrame(() => {
        document
          .querySelector(hash)
          ?.scrollIntoView({
            block: 'start',
          });
      });
    }
  }, [view]);

  if (view === 'about') {
    return <AboutPage />;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#f4f0e8] selection:bg-[#d6b86f] selection:text-black">
      <Header />

      <main>
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
