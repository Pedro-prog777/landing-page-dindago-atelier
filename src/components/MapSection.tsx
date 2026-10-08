import { useSite } from '../conteudo/useSite';
import { Clock, MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

export function MapSection() {
  const { conteudo, buildMapEmbedUrl, buildMapsUrl, isConfigured, siteConfig } = useSite();
  const { mapSection } = conteudo;
  const enderecoDefinido = isConfigured(siteConfig.address);
  const embedUrl = buildMapEmbedUrl();
  const mapsUrl = buildMapsUrl();

  const informacoes = [
    {
      rotulo: 'Endereço',
      valor: enderecoDefinido ? siteConfig.address : 'Informado no agendamento da visita',
      Icone: MapPin,
    },
    { rotulo: 'Visitas', valor: siteConfig.addressNote, Icone: Clock },
  ].filter((item) => isConfigured(item.valor));

  return (
    <section
      id="atelier"
      aria-labelledby="atelier-titulo"
      className="grao bg-papel-escuro py-16 sm:py-20 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              id="atelier-titulo"
              numero={mapSection.numero}
              eyebrow={mapSection.eyebrow}
              title={`Visite o ${siteConfig.name}`}
              description={mapSection.description}
              layout="empilhado"
            />

            <Reveal delay={100} className="mt-8">
              <ul className="space-y-4">
                {informacoes.map(({ rotulo, valor, Icone }) => (
                  <li key={rotulo} className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center bg-tijolo/10 text-tijolo">
                      <Icone className="size-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="etiqueta text-tinta-suave">{rotulo}</h3>
                      <p className="mt-0.5 font-display text-lg leading-snug text-tinta">{valor}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {mapsUrl && (
                <Button href={mapsUrl} variant="contorno" className="mt-8 w-full sm:w-auto">
                  <Navigation className="size-4" aria-hidden="true" />
                  Ver rota no Google Maps
                  <span className="sr-only"> (abre em nova aba)</span>
                </Button>
              )}
            </Reveal>
          </div>

          <Reveal delay={80} className="lg:col-span-7">
            <div className="border border-tinta/10 bg-papel p-2 shadow-[0_24px_50px_-34px_rgba(67,41,29,0.7)]">
              {embedUrl ? (
                <iframe
                  title={`Mapa com a localização do ${siteConfig.name}`}
                  src={embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-80 w-full border-0 bg-papel-escuro sm:h-104"
                />
              ) : (
                <div className="flex h-80 flex-col items-center justify-center gap-3 bg-papel-escuro/70 px-6 text-center sm:h-104">
                  <MapPin className="size-7 text-tijolo/70" aria-hidden="true" />
                  <p className="font-display text-xl text-tinta">Visitas com agendamento</p>
                  <p className="max-w-sm font-sans text-sm leading-relaxed text-tinta-suave">
                    Entre em contato para combinar um horário e receber o endereço do atelier.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
