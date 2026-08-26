import { MessageCircle } from 'lucide-react';
import { FacebookIcon, InstagramIcon, type IconComponent } from './ui/BrandIcons';
import { buildWhatsAppUrl, isConfigured, siteConfig } from '../config/site';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { clientData } from '../data/clientData';

type Rede = {
  nome: string;
  descricao: string;
  href: string | null;
  icone: IconComponent;
};

export function SocialSection() {
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

  return (
    <section
      aria-labelledby="redes-titulo"
      className="border-y border-bege bg-creme py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="redes-titulo"
          eyebrow={clientData.socialSection.eyebrow}
          title={clientData.socialSection.title}
          description={clientData.socialSection.subtitle}
        />

        {disponiveis.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {disponiveis.map((rede, indice) => {
              const Icone = rede.icone;
              return (
                <li key={rede.nome}>
                  <Reveal delay={indice * 80}>
                    <a
                      href={rede.href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-bege bg-areia/50 px-5 py-7 text-center transition hover:-translate-y-1 hover:border-terracota/40 hover:bg-areia"
                    >
                      <span className="flex size-12 items-center justify-center rounded-full bg-terracota/10 text-terracota transition group-hover:bg-terracota group-hover:text-creme">
                        <Icone className="size-5" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <span className="font-sans text-[0.72rem] font-bold tracking-[0.16em] text-marrom uppercase">
                        {rede.nome}
                      </span>
                      <span className="font-sans text-sm text-marrom-claro">{rede.descricao}</span>
                    </a>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        ) : (
          <Reveal className="mt-10">
            <p className="rounded-2xl border border-dashed border-bege-escuro bg-areia/50 p-6 text-center font-sans text-sm leading-relaxed text-marrom-claro">
              Os links de Instagram, Facebook e WhatsApp aparecem aqui assim que forem preenchidos
              em{' '}
              <code className="rounded bg-bege px-1.5 py-0.5 text-[0.85em] text-barro">
                src/data/clientData.ts
              </code>
              . Nenhum endereço é inventado enquanto isso.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
