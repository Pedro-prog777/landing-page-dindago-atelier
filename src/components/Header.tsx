import { useSite } from '../conteudo/useSite';
import { useEffect, useMemo, useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './ui/BrandIcons';
import { Logo } from './Logo';
import { SearchDialog } from './SearchDialog';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrollPosition } from '../hooks/useScrollPosition';

/**
 * Masthead da publicação.
 *
 * A faixa superior em âmbar vem da identidade aprovada. Abaixo dela, a
 * navegação fica sobre papel: nenhum botão em pílula — o contato é um bloco
 * chapado e o item ativo do menu é marcado por um fio, não por cor de fundo.
 */
export function Header() {
  const { buildWhatsAppUrl, isConfigured, navLinks, siteConfig } = useSite();
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const rolou = useScrollPosition(40);

  const idsSecoes = useMemo(() => navLinks.map((link) => link.href.slice(1)), [navLinks]);
  const secaoAtiva = useActiveSection(idsSecoes);

  const whatsappUrl = buildWhatsAppUrl();
  const instagramConfigurado = isConfigured(siteConfig.instagram);
  const facebookConfigurado = isConfigured(siteConfig.facebook);

  useEffect(() => {
    if (!menuAberto) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuAberto]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const fechar = () => media.matches && setMenuAberto(false);
    media.addEventListener('change', fechar);
    return () => media.removeEventListener('change', fechar);
  }, []);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only bg-tijolo px-6 py-4 font-sans text-sm font-semibold text-papel focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-80"
      >
        Ir para o conteúdo
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        {/* Faixa âmbar — recolhe ao rolar */}
        <div
          className={`overflow-hidden bg-ambar text-tinta transition-all duration-500 ease-out ${
            rolou ? 'max-h-0 opacity-0' : 'max-h-16 opacity-100'
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2.5 sm:px-6 lg:px-8">
            <p className="font-sans text-[0.68rem] leading-snug text-tinta/85">
              {siteConfig.tagline}
            </p>

            <div className="flex shrink-0 items-center gap-5">
              <p className="etiqueta hidden text-tinta sm:block">{siteConfig.shipping}</p>

              {(instagramConfigurado || facebookConfigurado) && (
                <ul className="flex items-center gap-3 border-tinta/25 sm:border-l sm:pl-5">
                  {instagramConfigurado && (
                    <li>
                      <a
                        href={siteConfig.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Instagram do ${siteConfig.name} (abre em nova aba)`}
                        className="flex size-6 items-center justify-center text-tinta/75 transition hover:text-tijolo"
                      >
                        <InstagramIcon className="size-4" aria-hidden="true" />
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
                        className="flex size-6 items-center justify-center text-tinta/75 transition hover:text-tijolo"
                      >
                        <FacebookIcon className="size-4" aria-hidden="true" />
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Barra de navegação */}
        <div
          className={`border-b transition-all duration-500 ease-out ${
            rolou ? 'border-tinta/15 bg-papel/95 backdrop-blur-md' : 'border-transparent bg-papel'
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
            <a href="#inicio" aria-label={`${siteConfig.name} — ir para o início`}>
              <Logo />
            </a>

            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {navLinks.map((link) => {
                  const ativo = secaoAtiva === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={ativo ? 'true' : undefined}
                        className={`flex flex-col items-center gap-1.5 py-2.5 font-sans text-[0.66rem] font-semibold tracking-[0.2em] uppercase transition-colors ${
                          ativo ? 'text-tijolo' : 'text-tinta/70 hover:text-tinta'
                        }`}
                      >
                        {link.label}
                        {/* O item ativo é marcado por fio, não por fundo colorido */}
                        <span
                          aria-hidden="true"
                          className={`h-px transition-all duration-500 ${
                            ativo ? 'w-full bg-tijolo' : 'w-0 bg-tinta'
                          }`}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBuscaAberta(true)}
                aria-label="Abrir busca"
                className="flex size-11 items-center justify-center text-tinta transition hover:text-tijolo"
              >
                <Search className="size-[1.1rem]" aria-hidden="true" />
              </button>

              <a
                href={whatsappUrl ?? '#contato'}
                {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="hidden min-h-11 items-center bg-tinta px-6 font-sans text-[0.62rem] font-semibold tracking-[0.2em] text-papel uppercase transition hover:bg-tijolo sm:inline-flex"
              >
                {whatsappUrl ? 'WhatsApp' : 'Contato'}
              </a>

              <button
                type="button"
                onClick={() => setMenuAberto((estado) => !estado)}
                aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menuAberto ? 'true' : 'false'}
                aria-controls="menu-mobile"
                className="flex size-11 items-center justify-center text-tinta lg:hidden"
              >
                {menuAberto ? (
                  <X className="size-6" aria-hidden="true" />
                ) : (
                  <Menu className="size-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile — caderno aberto, com numeração */}
        <div
          id="menu-mobile"
          hidden={!menuAberto}
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-tinta/15 bg-papel lg:hidden"
        >
          <nav aria-label="Navegação principal (mobile)" className="px-4 py-2 sm:px-6">
            <ul>
              {navLinks.map((link, indice) => (
                <li key={link.href} className="border-b border-tinta/10 last:border-none">
                  <a
                    href={link.href}
                    onClick={() => setMenuAberto(false)}
                    className="flex items-baseline gap-5 py-5 transition-colors hover:text-tijolo"
                  >
                    <span className="etiqueta text-tijolo/50">
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-3xl">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 py-6">
              <a
                href={whatsappUrl ?? '#contato'}
                {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setMenuAberto(false)}
                className="inline-flex min-h-13 items-center justify-center bg-tijolo px-6 font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-papel uppercase"
              >
                {whatsappUrl ? 'Falar pelo WhatsApp' : 'Ir para contato'}
              </a>
              <p className="etiqueta pt-1 text-center text-tinta/45">{siteConfig.shipping}</p>
            </div>
          </nav>
        </div>
      </header>

      <SearchDialog aberto={buscaAberta} aoFechar={() => setBuscaAberta(false)} />
    </>
  );
}
