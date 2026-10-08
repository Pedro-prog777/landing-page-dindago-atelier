import { useSite } from '../conteudo/useSite';
import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { WhatsAppIcon } from './ui/BrandIcons';
import { useScrollPosition } from '../hooks/useScrollPosition';

export function WhatsAppButton() {
  const { conteudo, buildWhatsAppUrl, siteConfig } = useSite();
  const rolou = useScrollPosition(300);
  const [sobreposto, setSobreposto] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(conteudo.whatsappDefaultMessage);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const alvos = ['contato', 'rodape']
      .map((id) => document.getElementById(id))
      .filter((elemento): elemento is HTMLElement => elemento !== null);
    if (alvos.length === 0) return;

    const visiveis = new Set<Element>();
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) visiveis.add(entrada.target);
          else visiveis.delete(entrada.target);
        }
        setSobreposto(visiveis.size > 0);
      },
      { threshold: 0.01 },
    );

    alvos.forEach((alvo) => observer.observe(alvo));
    return () => observer.disconnect();
  }, []);

  const visivel = rolou && !sobreposto;
  const destino = whatsappUrl ?? '#contato';
  const rotulo = whatsappUrl
    ? `Falar com o ${siteConfig.name} pelo WhatsApp (abre em nova aba)`
    : 'Ir para o formulário de contato';

  return (
    <a
      href={destino}
      {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={rotulo}
      aria-hidden={visivel ? undefined : true}
      tabIndex={visivel ? undefined : -1}
      className={`group fixed right-4 bottom-4 z-60 flex min-h-14 min-w-14 items-center justify-center gap-3 bg-cacto px-4 py-4 text-papel shadow-[0_14px_30px_-12px_rgba(67,41,29,0.9)] transition-all duration-500 hover:bg-tinta sm:right-6 sm:bottom-6 ${
        visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      {whatsappUrl ? (
        <WhatsAppIcon className="size-6 shrink-0" strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <MessageCircle className="size-6 shrink-0" strokeWidth={1.8} aria-hidden="true" />
      )}
      <span className="hidden font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase sm:inline">
        Fale conosco
      </span>
    </a>
  );
}
