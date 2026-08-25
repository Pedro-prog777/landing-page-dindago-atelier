import { AboutArtist } from './components/AboutArtist';
import { ContactSection } from './components/ContactSection';
import { CultureSection } from './components/CultureSection';
import { FeaturedPieces } from './components/FeaturedPieces';
import { Footer } from './components/Footer';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MapSection } from './components/MapSection';
import { OrdersSection } from './components/OrdersSection';
import { ProcessSection } from './components/ProcessSection';
import { SocialSection } from './components/SocialSection';
import { ValuesSection } from './components/ValuesSection';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  return (
    <>
      <Header />

      <main id="conteudo">
        <Hero />
        <ValuesSection />
        <ProcessSection />
        <FeaturedPieces />
        <Gallery />
        <AboutArtist />
        <CultureSection />
        <OrdersSection />
        <ContactSection />
        <MapSection />
        <SocialSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
