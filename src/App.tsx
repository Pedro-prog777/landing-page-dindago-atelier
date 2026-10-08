import { AboutArtist } from './components/AboutArtist';
import { ContactSection } from './components/ContactSection';
import { CultureSection } from './components/CultureSection';
import { FeaturedPieces } from './components/FeaturedPieces';
import { Footer } from './components/Footer';
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

      {/*
        Ordem de leitura: o que é (capa) → por que importa (diferenciais) →
        o trabalho (coleções) → como se faz (artesanato) → quem faz (atelier e
        história) → como encomendar → contato. A numeração dos cadernos em
        clientData.ts segue esta mesma ordem, e o menu também.
      */}
      <main id="conteudo">
        <Hero />
        <ValuesSection />
        <FeaturedPieces />
        <ProcessSection />
        <CultureSection />
        <AboutArtist />
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
