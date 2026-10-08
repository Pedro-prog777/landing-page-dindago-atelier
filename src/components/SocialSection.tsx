import { useSite } from '../conteudo/useSite';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from './ui/BrandIcons';
import { Caderno } from './ui/Catalogo';
import { Reveal } from './ui/Reveal';

/**
 * Redes sociais — o fechamento da página.
 *
 * Só aparecem as redes oficiais preenchidas em `clientData.social` e o
 * WhatsApp de `clientData.contact`; nada é inventado. O Instagram ganha o
 * perfil em corpo de capa, como assinatura da publicação, e o WhatsApp fica
 * como a conversa direta logo ao lado.
 */
export function SocialSection() {
  const { conteudo: clientData, buildWhatsAppUrl, isConfigured, siteConfig } = useSite();
  const { socialSection } = clientData;
  const instagram = isConfigured(siteConfig.instagram) ? siteConfig.instagram : null;
  const whatsappUrl = buildWhatsAppUrl();

  if (!instagram && !whatsappUrl) return null;

  return (
    <section
      id="redes"
      aria-labelledby="redes-titulo"
      className="grao relative overflow-hidden bg-papel py-16 sm:py-20 lg:py-24"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Caderno
          numero={socialSection.numero}
          titulo={socialSection.eyebrow}
          nota={instagram ? 'Instagram e WhatsApp' : 'WhatsApp'}
        />

        <div className="grid gap-6 pt-8 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pt-12">
          <Reveal className="lg:col-span-7">
            <h2 id="redes-titulo" className="text-[clamp(2.1rem,4.6vw,3.75rem)]">
              {socialSection.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-tinta-suave">
              {socialSection.subtitle}
            </p>
          </Reveal>

          {whatsappUrl && (
            <Reveal delay={90} className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-14 w-full items-center justify-center gap-3 bg-cacto px-7 font-sans text-[0.68rem] font-semibold tracking-[0.2em] text-papel uppercase shadow-[0_14px_30px_-18px_rgba(67,41,29,0.9)] transition hover:-translate-y-0.5 hover:bg-tinta sm:w-auto"
              >
                <WhatsAppIcon className="size-5" strokeWidth={1.8} aria-hidden="true" />
                Chamar no WhatsApp
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </Reveal>
          )}
        </div>

        {/* O perfil em corpo de capa: a linha inteira é o link */}
        {instagram && (
          <Reveal delay={120}>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Seguir ${siteConfig.instagramHandle} no Instagram (abre em nova aba)`}
              className="group mt-10 flex items-center justify-between gap-4 border-y border-tinta/15 py-6 transition-colors hover:border-tijolo/40 sm:py-8 lg:mt-14"
            >
              <span className="flex min-w-0 items-center gap-3 sm:gap-6">
                <InstagramIcon
                  className="size-7 shrink-0 text-tijolo sm:size-12 lg:size-16"
                  strokeWidth={1.3}
                  aria-hidden="true"
                />
                <span className="font-display text-[clamp(1.9rem,8.4vw,7rem)] leading-none text-tinta transition-colors duration-300 group-hover:text-tijolo">
                  {siteConfig.instagramHandle}
                </span>
              </span>
              <span className="hidden shrink-0 items-center gap-3 sm:flex">
                <span className="etiqueta text-tinta-suave transition-colors group-hover:text-tijolo">
                  Seguir
                </span>
                <ArrowUpRight
                  className="size-8 text-tinta-suave transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-tijolo lg:size-12"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
              </span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
