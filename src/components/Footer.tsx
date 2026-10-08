import { useSite } from '../conteudo/useSite';
import { Logo } from './Logo';
import { Fio, Xilogravura } from './ui/Catalogo';
import { Cacto, Flor } from './ui/Decorations';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './ui/BrandIcons';

export function Footer() {
  const {
    conteudo: clientData,
    buildMailtoUrl,
    buildWhatsAppUrl,
    isConfigured,
    navLinks,
    siteConfig,
  } = useSite();
  const { footer } = clientData;
  const whatsappUrl = buildWhatsAppUrl();
  const mailtoUrl = buildMailtoUrl();
  const enderecoDefinido = isConfigured(siteConfig.address);
  const instagramConfigurado = isConfigured(siteConfig.instagram);
  const facebookConfigurado = isConfigured(siteConfig.facebook);
  // Itens que ainda apontam para o contato não viram página falsa no rodapé.
  const infoLinks = footer.infoLinks.filter((item) => item.href !== '#contato');

  const atendimento = [
    ...(whatsappUrl
      ? [{ rotulo: 'WhatsApp', valor: siteConfig.whatsappDisplay, href: whatsappUrl }]
      : []),
    ...(mailtoUrl ? [{ rotulo: 'E-mail', valor: siteConfig.email, href: mailtoUrl }] : []),
    ...(enderecoDefinido
      ? [{ rotulo: 'Atelier', valor: siteConfig.address, href: '#atelier' }]
      : []),
  ];

  const redes = [
    ...(instagramConfigurado
      ? [
          {
            nome: 'Instagram',
            rotulo: siteConfig.instagramHandle,
            href: siteConfig.instagram,
            Icone: InstagramIcon,
          },
        ]
      : []),
    ...(facebookConfigurado
      ? [{ nome: 'Facebook', rotulo: 'Facebook', href: siteConfig.facebook, Icone: FacebookIcon }]
      : []),
  ];

  const estiloLink =
    'inline-flex min-h-9 items-center gap-3 font-sans text-sm text-papel/85 transition-colors hover:text-ambar';

  return (
    <footer
      id="rodape"
      className="grao grao-claro relative overflow-hidden bg-tinta-media text-papel"
    >
      <Xilogravura className="w-full text-tijolo" altura={12} />

      {/* Sertão no colofão: só no canto inferior direito, longe de texto e link. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
        <Cacto className="absolute right-10 bottom-24 w-20 text-ambar/20" />
        <Flor className="absolute right-32 bottom-20 w-14 text-tijolo-claro/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8 lg:pt-20">
        {/* Marca em corpo grande */}
        <div className="grid gap-6 pb-12 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-14">
          <div className="lg:col-span-6">
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-papel/85">
              {footer.tagline}
            </p>
          </div>

          <p className="etiqueta text-ambar lg:col-span-3 lg:col-start-10 lg:text-right">
            {siteConfig.shipping}
          </p>
        </div>

        <Fio tone="claro" />

        {/* Colunas de serviço */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-12 lg:gap-10">
          <nav aria-label="Navegação do rodapé" className="lg:col-span-3">
            <h2 className="etiqueta text-papel/75">Navegação</h2>
            <ul className="mt-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={estiloLink}>
                    <span className="sublinhado">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {infoLinks.length > 0 && (
            <nav aria-label="Informações" className="lg:col-span-3">
              <h2 className="etiqueta text-papel/75">Informações</h2>
              <ul className="mt-4">
                {infoLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className={estiloLink}>
                      <span className="sublinhado">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="col-span-2 sm:col-span-1 lg:col-span-4">
            <h2 className="etiqueta text-papel/75">Atendimento</h2>
            <dl className="mt-4 space-y-4">
              {atendimento.map((item) => (
                <div key={item.rotulo}>
                  <dt className="etiqueta text-papel/70">{item.rotulo}</dt>
                  <dd className="mt-1">
                    <a
                      href={item.href}
                      {...(item.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="inline-block py-1 font-display text-lg wrap-break-word text-papel transition-colors hover:text-ambar"
                    >
                      {item.valor}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {(redes.length > 0 || whatsappUrl) && (
            <div className="lg:col-span-3 lg:col-start-10">
              <h2 className="etiqueta text-papel/75">Siga o atelier</h2>
              <ul className="mt-4">
                {redes.map(({ nome, rotulo, href, Icone }) => (
                  <li key={nome}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${nome} do ${siteConfig.name} (abre em nova aba)`}
                      className={estiloLink}
                    >
                      <Icone className="size-4 shrink-0" aria-hidden="true" />
                      <span className="sublinhado">{rotulo}</span>
                    </a>
                  </li>
                ))}
                {whatsappUrl && (
                  <li>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp do ${siteConfig.name} (abre em nova aba)`}
                      className={estiloLink}
                    >
                      <WhatsAppIcon className="size-4 shrink-0" aria-hidden="true" />
                      <span className="sublinhado">WhatsApp</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <Fio tone="claro" />

        <div className="flex flex-col items-start justify-between gap-3 pt-6 sm:flex-row sm:items-center">
          <p className="etiqueta text-papel/70">
            © {footer.copyrightYear} {siteConfig.name} · {siteConfig.segment}
          </p>
          <a
            href="#inicio"
            className="etiqueta inline-flex min-h-9 items-center text-papel/80 transition-colors hover:text-ambar"
          >
            <span className="sublinhado">Voltar ao início ↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
