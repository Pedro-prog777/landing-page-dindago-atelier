import { useSite } from '../conteudo/useSite';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, type IconComponent } from './ui/BrandIcons';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

type Rede = {
  nome: string;
  descricao: string;
  href: string | null;
  icone: IconComponent;
};

/**
 * Redes sociais.
 *
 * A seção só existe quando há pelo menos um endereço real preenchido em
 * `clientData.social` (ou o WhatsApp em `clientData.contact`). Sem nenhum, ela
 * simplesmente não aparece — nunca um aviso técnico nem um link inventado.
 */
export function SocialSection() {
  const { conteudo: clientData, buildWhatsAppUrl, isConfigured, siteConfig } = useSite();
  const redes: Rede[] = [
    {
      nome: 'Instagram',
      descricao: 'Novas peças, bastidores e processos',
      href: isConfigured(siteConfig.instagram) ? siteConfig.instagram : null,
      icone: InstagramIcon,
    },
    {
      nome: 'Facebook',
      descricao: 'Registros do atelier e novidades',
      href: isConfigured(siteConfig.facebook) ? siteConfig.facebook : null,
      icone: FacebookIcon,
    },
    {
      nome: 'WhatsApp',
      descricao: 'Conversa direta com o atelier',
      href: buildWhatsAppUrl(),
      icone: MessageCircle,
    },
  ];

  const disponiveis = redes.filter((rede) => rede.href !== null);
  if (disponiveis.length === 0) return null;

  return (
    <section aria-labelledby="redes-titulo" className="bg-papel py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="redes-titulo"
          numero={clientData.socialSection.numero}
          eyebrow={clientData.socialSection.eyebrow}
          title={clientData.socialSection.title}
          description={clientData.socialSection.subtitle}
        />

        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {disponiveis.map((rede, indice) => {
            const Icone = rede.icone;
            return (
              <li key={rede.nome}>
                <Reveal delay={indice * 80} className="h-full">
                  <a
                    href={rede.href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-center gap-4 border border-tinta/10 bg-papel-escuro/50 p-5 transition hover:-translate-y-1 hover:border-tijolo/40 hover:bg-papel-escuro"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center bg-tijolo/10 text-tijolo transition group-hover:bg-tijolo group-hover:text-papel">
                      <Icone className="size-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="etiqueta block text-tinta">{rede.nome}</span>
                      <span className="mt-1 block font-sans text-sm text-tinta-suave">
                        {rede.descricao}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-tinta-suave transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tijolo"
                      aria-hidden="true"
                    />
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
