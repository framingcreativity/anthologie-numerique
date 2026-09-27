import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Gallery from './components/Gallery';
import ObservationSection from './components/ObservationSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
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
