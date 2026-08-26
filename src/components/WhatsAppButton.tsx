import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, siteConfig, WHATSAPP_DEFAULT_MESSAGE } from '../config/site';
import { useScrollPosition } from '../hooks/useScrollPosition';

/**
 * Botão flutuante de contato. Fica sempre acessível no canto inferior direito
 * e aparece com uma transição suave depois da primeira rolagem.
 *
 * Enquanto o número não estiver configurado em `src/config/site.ts`, o botão
 * leva ao formulário de contato — nunca a um link inventado.
 */
export function WhatsAppButton() {
  const rolou = useScrollPosition(300);
  const [sobreRodape, setSobreRodape] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(WHATSAPP_DEFAULT_MESSAGE);

  // No rodapé o botão sai de cena: lá os contatos já aparecem por extenso e
  // ele cobriria o link "Voltar ao topo".
  useEffect(() => {
    const rodape = document.getElementById('rodape');
    if (!rodape || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entrada]) => setSobreRodape(entrada.isIntersecting),
      { threshold: 0.01 },
    );

    observer.observe(rodape);
    return () => observer.disconnect();
  }, []);

  const visivel = rolou && !sobreRodape;
  const destino = whatsappUrl ?? '#contato';
  const rotulo = whatsappUrl
    ? `Falar com o ${siteConfig.name} pelo WhatsApp (abre em nova aba)`
    : 'Ir para o formulário de contato';

  return (
    <a
      href={destino}
      {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={rotulo}
      className={`group fixed right-4 bottom-4 z-60 flex min-h-14 items-center gap-3 rounded-full bg-verde px-4 py-4 text-creme shadow-[0_14px_30px_-12px_rgba(67,41,29,0.9)] transition-all duration-500 hover:bg-marrom sm:right-6 sm:bottom-6 ${
        visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <MessageCircle className="size-6 shrink-0" strokeWidth={1.8} aria-hidden="true" />
      <span className="hidden font-sans text-[0.72rem] font-semibold tracking-[0.14em] uppercase sm:inline">
        Fale conosco
      </span>
    </a>
  );
}
