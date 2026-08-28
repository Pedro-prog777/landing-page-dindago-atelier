import { useSite } from '../conteudo/useSite';
import { Clock, MapPin, Navigation } from 'lucide-react';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

export function MapSection() {
  const { buildMapEmbedUrl, buildMapsUrl, isConfigured, siteConfig } = useSite();
  const enderecoDefinido = isConfigured(siteConfig.address);
  const embedUrl = buildMapEmbedUrl();
  const mapsUrl = buildMapsUrl();

  return (
    <section
      id="atelier"
      aria-labelledby="atelier-titulo"
      className="textura-papel bg-papel-escuro py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              id="atelier-titulo"
              numero={'10'}
              eyebrow="Localização"
              title={`Visite o ${siteConfig.name}`}
              description="O atelier é onde tudo acontece: a pesquisa, a bancada, a secagem lenta das peças e as conversas sobre cada encomenda."
            />

            <Reveal delay={100} className="mt-8">
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center bg-tijolo/10 text-tijolo">
                    <MapPin className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-[0.68rem] font-semibold tracking-[0.16em] text-tinta-suave uppercase">
                      Endereço
                    </h3>
                    <p className="mt-1 font-display text-base text-tinta">
                      {enderecoDefinido ? siteConfig.address : 'Endereço a ser divulgado'}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center bg-tijolo/10 text-tijolo">
                    <Clock className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-[0.68rem] font-semibold tracking-[0.16em] text-tinta-suave uppercase">
                      Visitas
                    </h3>
                    <p className="mt-1 font-display text-base text-tinta">
                      {siteConfig.addressNote}
                    </p>
                  </div>
                </li>
              </ul>

              {mapsUrl && (
                <Button href={mapsUrl} variant="contorno" className="mt-8">
                  <Navigation className="size-4" aria-hidden="true" />
                  Ver rota no Google Maps
                </Button>
              )}
            </Reveal>
          </div>

          <Reveal delay={80} className="lg:col-span-7">
            <div className="overflow-hidden -[1.75rem] border border-papel-escuro/60 bg-papel p-2 shadow-[0_24px_50px_-34px_rgba(67,41,29,0.7)]">
              {embedUrl ? (
                <iframe
                  title={`Mapa com a localização do ${siteConfig.name}`}
                  src={embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-88 w-full border-0 sm:h-104"
                />
              ) : (
                <div className="flex h-88 flex-col items-center justify-center gap-3 border border-dashed border-papel-escuro bg-papel-escuro/70 px-6 text-center sm:h-104">
                  <MapPin className="size-7 text-tinta-suave/60" aria-hidden="true" />
                  <p className="font-display text-lg text-tinta">Mapa aguardando o endereço</p>
                  <p className="max-w-sm font-sans text-sm leading-relaxed text-tinta-suave">
                    Preencha{' '}
                    <code className=" bg-papel-escuro px-1.5 py-0.5 text-[0.85em] text-tinta-suave">
                      contact.address
                    </code>{' '}
                    em{' '}
                    <code className=" bg-papel-escuro px-1.5 py-0.5 text-[0.85em] text-tinta-suave">
                      src/data/clientData.ts
                    </code>{' '}
                    e o mapa aparece aqui automaticamente.
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
