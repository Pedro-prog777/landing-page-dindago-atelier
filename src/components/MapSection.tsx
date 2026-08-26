import { Clock, MapPin, Navigation } from 'lucide-react';
import { buildMapEmbedUrl, buildMapsUrl, isConfigured, siteConfig } from '../config/site';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

export function MapSection() {
  const enderecoDefinido = isConfigured(siteConfig.address);
  const embedUrl = buildMapEmbedUrl();
  const mapsUrl = buildMapsUrl();

  return (
    <section
      id="atelier"
      aria-labelledby="atelier-titulo"
      className="textura-papel bg-areia py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              id="atelier-titulo"
              eyebrow="Localização"
              title={`Visite o ${siteConfig.name}`}
              description="O atelier é onde tudo acontece: a pesquisa, a bancada, a secagem lenta das peças e as conversas sobre cada encomenda."
              align="left"
            />

            <Reveal delay={100} className="mt-8">
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-terracota/10 text-terracota">
                    <MapPin className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-[0.68rem] font-semibold tracking-[0.16em] text-marrom-claro uppercase">
                      Endereço
                    </h3>
                    <p className="mt-1 font-display text-base text-marrom">
                      {enderecoDefinido ? siteConfig.address : 'Endereço a ser divulgado'}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-terracota/10 text-terracota">
                    <Clock className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-[0.68rem] font-semibold tracking-[0.16em] text-marrom-claro uppercase">
                      Visitas
                    </h3>
                    <p className="mt-1 font-display text-base text-marrom">
                      {siteConfig.addressNote}
                    </p>
                  </div>
                </li>
              </ul>

              {mapsUrl && (
                <Button href={mapsUrl} variant="outline" className="mt-8">
                  <Navigation className="size-4" aria-hidden="true" />
                  Ver rota no Google Maps
                </Button>
              )}
            </Reveal>
          </div>

          <Reveal delay={80} className="lg:col-span-7">
            <div className="overflow-hidden rounded-[1.75rem] border border-bege-escuro/60 bg-creme p-2 shadow-[0_24px_50px_-34px_rgba(67,41,29,0.7)]">
              {embedUrl ? (
                <iframe
                  title={`Mapa com a localização do ${siteConfig.name}`}
                  src={embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[22rem] w-full rounded-[1.5rem] border-0 sm:h-[26rem]"
                />
              ) : (
                <div className="flex h-[22rem] flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-dashed border-bege-escuro bg-areia/70 px-6 text-center sm:h-[26rem]">
                  <MapPin className="size-7 text-barro/60" aria-hidden="true" />
                  <p className="font-display text-lg text-marrom">Mapa aguardando o endereço</p>
                  <p className="max-w-sm font-sans text-sm leading-relaxed text-marrom-claro">
                    Preencha{' '}
                    <code className="rounded bg-bege px-1.5 py-0.5 text-[0.85em] text-barro">
                      contact.address
                    </code>{' '}
                    em{' '}
                    <code className="rounded bg-bege px-1.5 py-0.5 text-[0.85em] text-barro">
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
