import { buildMailtoUrl, buildWhatsAppUrl, isConfigured, siteConfig } from '../config/site';
import { clientData } from '../data/clientData';
import { Logo } from './Logo';
import { Fio, Xilogravura } from './ui/Catalogo';
import { FacebookIcon, InstagramIcon } from './ui/BrandIcons';

/**
 * Colofão — a última página da publicação.
 *
 * É a composição mais densa do site: a marca em corpo grande, as colunas de
 * serviço em fio fino e a faixa de xilogravura fechando o caderno. Sem pílulas
 * e sem ícones em círculo: os links são texto com fio, como no resto do papel.
 */
export function Footer() {
  const { footer } = clientData;
  const whatsappUrl = buildWhatsAppUrl();
  const mailtoUrl = buildMailtoUrl();
  const enderecoDefinido = isConfigured(siteConfig.address);
  const instagramConfigurado = isConfigured(siteConfig.instagram);
  const facebookConfigurado = isConfigured(siteConfig.facebook);

  const atendimento = [
    {
      rotulo: 'WhatsApp',
      valor: whatsappUrl ? siteConfig.whatsappDisplay : 'A definir',
      href: whatsappUrl,
    },
    { rotulo: 'E-mail', valor: mailtoUrl ? siteConfig.email : 'A definir', href: mailtoUrl },
    {
      rotulo: 'Atelier',
      valor: enderecoDefinido ? siteConfig.address : 'A definir',
      href: '#atelier',
    },
  ];

  const redes = [
    {
      nome: 'Instagram',
      href: instagramConfigurado ? siteConfig.instagram : null,
      Icone: InstagramIcon,
    },
    {
      nome: 'Facebook',
      href: facebookConfigurado ? siteConfig.facebook : null,
      Icone: FacebookIcon,
    },
  ].filter((r) => r.href);

  return (
    <footer id="rodape" className="grao grao-claro bg-tinta text-papel">
      <Xilogravura className="w-full text-tijolo" altura={12} />

      <div className="px-4 pt-14 pb-8 sm:px-6 lg:px-10 lg:pt-20">
        {/* Marca em corpo grande */}
        <div className="grid gap-10 pb-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-base leading-relaxed text-papel/65">
              {footer.tagline}
            </p>
          </div>

          <p className="etiqueta text-ambar lg:col-span-3 lg:col-start-10 lg:text-right">
            {siteConfig.shipping}
          </p>
        </div>

        <Fio tone="claro" />

        {/* Colunas de serviço */}
        <div className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-10">
          <nav aria-label="Informações" className="lg:col-span-3">
            <h2 className="etiqueta text-papel/45">Informações</h2>
            <ul className="mt-5 space-y-1">
              {footer.infoLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-block py-1.5 font-sans text-sm text-papel/75 transition-colors hover:text-ambar"
                  >
                    <span className="sublinhado">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="etiqueta text-papel/45">Atendimento</h2>
            <dl className="mt-5 space-y-4">
              {atendimento.map((item) => (
                <div key={item.rotulo}>
                  <dt className="etiqueta text-papel/35">{item.rotulo}</dt>
                  <dd className="mt-1">
                    <a
                      href={item.href ?? '#contato'}
                      {...(item.href?.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="inline-block py-1 font-display text-lg break-words text-papel transition-colors hover:text-ambar"
                    >
                      {item.valor}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <h2 className="etiqueta text-papel/45">Siga o atelier</h2>
            <ul className="mt-5 space-y-1">
              {redes.map(({ nome, href, Icone }) => (
                <li key={nome}>
                  <a
                    href={href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${nome} do ${siteConfig.name} (abre em nova aba)`}
                    className="inline-flex items-center gap-3 py-1.5 font-sans text-sm text-papel/75 transition-colors hover:text-ambar"
                  >
                    <Icone className="size-4 shrink-0" aria-hidden="true" />
                    <span className="sublinhado">{nome}</span>
                  </a>
                </li>
              ))}
              {whatsappUrl && (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-1.5 font-sans text-sm text-papel/75 transition-colors hover:text-ambar"
                  >
                    <span className="sublinhado">WhatsApp</span>
                  </a>
                </li>
              )}
              {redes.length === 0 && !whatsappUrl && (
                <li className="font-sans text-sm text-papel/45">Canais a definir</li>
              )}
            </ul>
          </div>
        </div>

        <Fio tone="claro" />

        <div className="flex flex-col items-start justify-between gap-3 pt-6 sm:flex-row sm:items-center">
          <p className="etiqueta text-papel/40">
            © {footer.copyrightYear} {siteConfig.name}
          </p>
          <a
            href="#inicio"
            className="etiqueta py-1.5 text-papel/55 transition-colors hover:text-ambar"
          >
            <span className="sublinhado">Voltar ao início</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
