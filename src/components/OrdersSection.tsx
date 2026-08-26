import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/site';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { clientData } from '../data/clientData';

export function OrdersSection() {
  const { orders } = clientData;
  const fluxo = orders.steps;

  const whatsappUrl = buildWhatsAppUrl(
    `Olá! Gostaria de conversar sobre uma encomenda personalizada com o ${clientData.company.name}.`,
  );

  return (
    <section
      id="encomendas"
      aria-labelledby="encomendas-titulo"
      className="textura-papel bg-areia py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="encomendas-titulo"
          eyebrow={orders.eyebrow}
          title={orders.title}
          description={orders.subtitle}
        />

        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {fluxo.map((etapa, indice) => (
            <Reveal as="li" key={etapa.number} delay={indice * 90} className="relative">
              {/* Linha conectando as etapas no desktop */}
              {indice < fluxo.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-5 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-5rem)] bg-gradient-to-r from-terracota/40 to-transparent lg:block"
                />
              )}
              <div className="relative">
                <span className="flex size-10 items-center justify-center rounded-full bg-terracota font-sans text-[0.7rem] font-bold text-creme lg:mx-auto">
                  {etapa.number}
                </span>
                <h3 className="mt-5 font-display text-lg font-normal text-marrom lg:text-center">
                  {etapa.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-marrom-claro lg:text-center">
                  {etapa.text}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120} className="mt-16">
          <div className="flex flex-col items-center gap-6 rounded-[1.75rem] border border-bege-escuro/60 bg-creme px-6 py-10 text-center sm:px-10 lg:flex-row lg:justify-between lg:gap-10 lg:text-left">
            <div className="max-w-xl">
              <h3 className="font-display text-2xl font-light text-marrom sm:text-[1.7rem]">
                {orders.ctaTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-marrom-claro sm:text-base">
                {orders.ctaText}
              </p>
            </div>
            <Button href={whatsappUrl ?? '#contato'} size="lg" className="shrink-0">
              <MessageCircle className="size-4" aria-hidden="true" />
              {orders.ctaLabel}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
