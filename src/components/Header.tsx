import { useEffect, useMemo, useState } from 'react';
import { Feather, Menu, MessageCircle, Search, Truck, X } from 'lucide-react';
import { FacebookIcon, InstagramIcon } from './ui/BrandIcons';
import { Logo } from './Logo';
import { SearchDialog } from './SearchDialog';
import { buildWhatsAppUrl, isConfigured, navLinks, siteConfig } from '../config/site';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrollPosition } from '../hooks/useScrollPosition';

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const rolou = useScrollPosition(40);

  const idsSecoes = useMemo(() => navLinks.map((link) => link.href.slice(1)), []);
  const secaoAtiva = useActiveSection(idsSecoes);

  const whatsappUrl = buildWhatsAppUrl();
  const instagramConfigurado = isConfigured(siteConfig.instagram);
  const facebookConfigurado = isConfigured(siteConfig.facebook);

  // Trava o scroll do fundo enquanto o menu mobile estiver aberto.
  useEffect(() => {
    if (!menuAberto) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuAberto]);

  // Fecha o menu automaticamente ao voltar para a largura de desktop.
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
        className="sr-only rounded-full bg-terracota px-5 py-3.5 font-sans text-sm font-semibold text-creme focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-80"
      >
        Ir para o conteúdo
      </a>

      <header className="fixed inset-x-0 top-0 z-50">
        {/* Barra superior — recolhe ao rolar a página */}
        <div
          className={`overflow-hidden bg-amarelo text-marrom transition-all duration-500 ease-out ${
            rolou ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
            <p className="flex items-center gap-2 font-sans text-[0.7rem] leading-snug tracking-[0.04em] text-marrom sm:text-xs">
              <Feather className="hidden size-3.5 shrink-0 sm:block" aria-hidden="true" />
              {siteConfig.tagline}
            </p>

            <div className="flex shrink-0 items-center gap-4">
              <p className="hidden items-center gap-2 font-sans text-[0.7rem] font-semibold tracking-[0.1em] text-marrom sm:flex">
                <Truck className="size-3.5" aria-hidden="true" />
                {siteConfig.shipping}
              </p>

              {(instagramConfigurado || facebookConfigurado) && (
                <ul className="flex items-center gap-2.5 border-marrom/25 sm:border-l sm:pl-4">
                  {instagramConfigurado && (
                    <li>
                      <a
                        href={siteConfig.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Instagram do ${siteConfig.name} (abre em nova aba)`}
                        className="block text-marrom/80 transition hover:text-marrom"
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
                        className="block text-marrom/80 transition hover:text-marrom"
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

        {/* Navegação */}
        <div
          className={`transition-all duration-500 ease-out ${
            rolou
              ? 'border-b border-bege/70 bg-creme/95 shadow-[0_8px_28px_-22px_rgba(67,41,29,0.8)] backdrop-blur-md'
              : 'border-b border-transparent bg-creme'
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <a href="#inicio" aria-label={`${siteConfig.name} — ir para o início`}>
              <Logo />
            </a>

            <nav aria-label="Navegação principal" className="hidden lg:block">
              <ul className="flex items-center gap-7">
                {navLinks.map((link) => {
                  const ativo = secaoAtiva === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={ativo ? 'true' : undefined}
                        className={`flex items-center py-2.5 font-sans text-[0.78rem] font-semibold tracking-[0.14em] uppercase transition-colors ${
                          ativo ? 'text-terracota' : 'text-marrom hover:text-terracota'
                        }`}
                      >
                        <span className="link-sublinhado">{link.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setBuscaAberta(true)}
                aria-label="Abrir busca"
                className="flex size-10 items-center justify-center rounded-full text-marrom transition hover:bg-areia hover:text-terracota"
              >
                <Search className="size-[1.15rem]" aria-hidden="true" />
              </button>

              {instagramConfigurado && (
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram do ${siteConfig.name} (abre em nova aba)`}
                  className="hidden size-10 items-center justify-center rounded-full text-marrom transition hover:bg-areia hover:text-terracota sm:flex"
                >
                  <InstagramIcon className="size-[1.15rem]" aria-hidden="true" />
                </a>
              )}

              <a
                href={whatsappUrl ?? '#contato'}
                {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="hidden items-center gap-2 rounded-full bg-terracota px-5 py-2.5 font-sans text-[0.7rem] font-semibold tracking-[0.14em] text-creme uppercase transition hover:bg-barro sm:inline-flex"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {whatsappUrl ? 'WhatsApp' : 'Contato'}
              </a>

              <button
                type="button"
                onClick={() => setMenuAberto((estado) => !estado)}
                aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={menuAberto ? 'true' : 'false'}
                aria-controls="menu-mobile"
                className="flex size-10 items-center justify-center rounded-full text-marrom transition hover:bg-areia lg:hidden"
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

        {/* Menu mobile */}
        <div
          id="menu-mobile"
          hidden={!menuAberto}
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-bege bg-creme shadow-xl lg:hidden"
        >
          <nav aria-label="Navegação principal (mobile)" className="px-4 py-4 sm:px-6">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-bege/70 last:border-none">
                  <a
                    href={link.href}
                    onClick={() => setMenuAberto(false)}
                    className="block py-4 font-display text-lg text-marrom transition hover:text-terracota"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href={whatsappUrl ?? '#contato'}
                {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setMenuAberto(false)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-terracota px-6 font-sans text-xs font-semibold tracking-[0.14em] text-creme uppercase"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {whatsappUrl ? 'Falar pelo WhatsApp' : 'Ir para contato'}
              </a>

              {instagramConfigurado && (
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-marrom/25 px-6 font-sans text-xs font-semibold tracking-[0.14em] text-marrom uppercase"
                >
                  <InstagramIcon className="size-4" aria-hidden="true" />
                  Instagram
                </a>
              )}

              <p className="flex items-center justify-center gap-2 pt-1 font-sans text-[0.7rem] tracking-[0.12em] text-barro uppercase">
                <Truck className="size-3.5" aria-hidden="true" />
                {siteConfig.shipping}
              </p>
            </div>
          </nav>
        </div>
      </header>

      <SearchDialog aberto={buscaAberta} aoFechar={() => setBuscaAberta(false)} />
    </>
  );
}
