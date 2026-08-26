import { ArrowUp, Mail, MapPin, MessageCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './ui/BrandIcons';
import { buildMailtoUrl, buildWhatsAppUrl, isConfigured, siteConfig } from '../config/site';
import { Cactus, PatternBand } from './ui/Decorations';
import { clientData } from '../data/clientData';
import { Logo } from './Logo';

export function Footer() {
  const { footer } = clientData;
  const whatsappUrl = buildWhatsAppUrl();
  const mailtoUrl = buildMailtoUrl();
  const enderecoDefinido = isConfigured(siteConfig.address);
  const instagramConfigurado = isConfigured(siteConfig.instagram);
  const facebookConfigurado = isConfigured(siteConfig.facebook);

  return (
    <footer id="rodape" className="relative overflow-hidden bg-marrom text-creme">
      <PatternBand className="absolute inset-x-0 top-0 text-amarelo/45" />

      <Cactus
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-6 hidden w-14 text-amarelo/20 lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 sm:pt-18 sm:pb-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-creme/70">{footer.tagline}</p>
            <p className="mt-5 font-sans text-[0.68rem] tracking-[0.18em] text-amarelo uppercase">
              {siteConfig.shipping}
            </p>
          </div>

          <nav aria-label="Informações" className="lg:col-span-3">
            <h2 className="font-sans text-[0.7rem] font-bold tracking-[0.2em] text-creme uppercase">
              Informações
            </h2>
            <ul className="mt-5 space-y-3">
              {footer.infoLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="link-sublinhado inline-block py-1 font-sans text-sm text-creme/70 transition hover:text-creme"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-[0.7rem] font-bold tracking-[0.2em] text-creme uppercase">
              Atendimento
            </h2>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href={whatsappUrl ?? '#contato'}
                  {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-start gap-3 py-1 font-sans text-sm text-creme/70 transition hover:text-creme"
                >
                  <MessageCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {whatsappUrl ? siteConfig.whatsappDisplay : 'WhatsApp em breve'}
                </a>
              </li>
              <li>
                <a
                  href={mailtoUrl ?? '#contato'}
                  className="flex items-start gap-3 py-1 font-sans text-sm break-all text-creme/70 transition hover:text-creme"
                >
                  <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {mailtoUrl ? siteConfig.email : 'E-mail em breve'}
                </a>
              </li>
              <li>
                <a
                  href="#atelier"
                  className="flex items-start gap-3 py-1 font-sans text-sm text-creme/70 transition hover:text-creme"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {enderecoDefinido ? siteConfig.address : 'Endereço a ser divulgado'}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-sans text-[0.7rem] font-bold tracking-[0.2em] text-creme uppercase">
              Siga-nos
            </h2>
            <ul className="mt-5 flex gap-3">
              {instagramConfigurado && (
                <li>
                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram do ${siteConfig.name} (abre em nova aba)`}
                    className="flex size-11 items-center justify-center rounded-full border border-creme/25 text-creme transition hover:bg-creme hover:text-marrom"
                  >
                    <InstagramIcon className="size-[1.15rem]" aria-hidden="true" />
                  </a>
                </li>
              )}
              {facebookConfigurado && (
                <li>
                  <a
                    href={siteConfig.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Facebook do ${siteConfig.name} (abre em nova aba)`}
                    className="flex size-11 items-center justify-center rounded-full border border-creme/25 text-creme transition hover:bg-creme hover:text-marrom"
                  >
                    <FacebookIcon className="size-[1.15rem]" aria-hidden="true" />
                  </a>
                </li>
              )}
              <li>
                <a
                  href={whatsappUrl ?? '#contato'}
                  {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={`Falar com o ${siteConfig.name} pelo WhatsApp`}
                  className="flex size-11 items-center justify-center rounded-full border border-creme/25 text-creme transition hover:bg-creme hover:text-marrom"
                >
                  <MessageCircle className="size-[1.15rem]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-creme/15 pt-6 sm:flex-row">
          <p className="text-center font-sans text-xs text-creme/60 sm:text-left">
            © {footer.copyrightYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <a
            href="#inicio"
            className="inline-flex items-center gap-2 py-1.5 font-sans text-[0.68rem] tracking-[0.16em] text-creme/70 uppercase transition hover:text-creme"
          >
            Voltar ao topo
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
