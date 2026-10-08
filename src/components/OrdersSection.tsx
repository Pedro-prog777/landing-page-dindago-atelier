import { useSite } from '../conteudo/useSite';
import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';
import { Caderno, Numeral } from './ui/Catalogo';
import { Cacto } from './ui/Decorations';
import { preencherContato } from '../lib/eventos';
import { WhatsAppIcon } from './ui/BrandIcons';

export function OrdersSection() {
  const { conteudo: clientData, buildWhatsAppUrl } = useSite();
  const { orders } = clientData;
  const whatsappUrl = buildWhatsAppUrl(
    `Olá! Gostaria de conversar sobre uma encomenda personalizada com o ${clientData.company.name}.`,
  );

  // Sem WhatsApp, a chamada leva ao formulário com o assunto já escolhido.
  const aoClicarChamada = whatsappUrl
    ? undefined
    : () => preencherContato({ assunto: clientData.contact.subjects[1] });

  return (
    <section
      id="encomendas"
      aria-labelledby="encomendas-titulo"
      className="grao relative overflow-hidden bg-papel pt-16 sm:pt-20 lg:pt-24"
    >
      <Cacto
        className="pointer-events-none absolute top-28 left-1 hidden w-12 text-cacto/25 2xl:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Caderno numero={orders.numero} titulo={orders.eyebrow} nota="Como funciona" />

        <div className="grid gap-6 pt-8 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pt-12">
          <Reveal className="lg:col-span-7">
            <h2 id="encomendas-titulo" className="text-[clamp(2.1rem,4.6vw,3.75rem)]">
              {orders.title}
            </h2>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="text-base leading-relaxed text-tinta-suave">{orders.subtitle}</p>
          </Reveal>
        </div>

        {/* Quadrantes */}
        <ol className="mt-10 grid grid-cols-1 border-t border-tinta/15 sm:grid-cols-2 lg:mt-16">
          {orders.steps.map((etapa, indice) => (
            <li
              key={etapa.number}
              className="group relative overflow-hidden border-b border-tinta/15 sm:odd:border-r"
            >
              <Reveal
                delay={indice * 80}
                className="relative h-full px-0 py-8 transition-colors duration-500 group-hover:bg-papel-escuro/50 sm:px-8 sm:py-10 lg:px-12 lg:py-14"
              >
                <Numeral className="absolute -top-1 right-0 text-[5rem] transition-colors duration-500 group-hover:text-tijolo/40 sm:right-2 sm:text-[7rem] lg:right-6 lg:text-[9rem]">
                  {etapa.number}
                </Numeral>

                <div className="relative max-w-sm pr-16 sm:pr-0">
                  <span className="etiqueta text-tijolo">Etapa {etapa.number}</span>
                  <h3 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight sm:mt-4">
                    {etapa.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-tinta-media sm:text-[0.95rem]">
                    {etapa.text}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* CHAMADA FINAL — sangria total sobre tijolo */}
      <Reveal delay={100} className="grao grao-claro mt-14 bg-tijolo lg:mt-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-12 lg:items-end lg:gap-10 lg:px-8 lg:py-24">
          <div className="lg:col-span-8">
            <h3 className="text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.02] text-papel">
              {orders.ctaTitle}
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-papel/90 sm:mt-6">
              {orders.ctaText}
            </p>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end lg:pb-3">
            <Button
              href={whatsappUrl ?? '#contato'}
              onClick={aoClicarChamada}
              variant="papel"
              size="lg"
              className="w-full sm:w-auto"
            >
              {whatsappUrl && <WhatsAppIcon className="size-5" aria-hidden="true" />}
              {orders.ctaLabel}
              <span aria-hidden="true">→</span>
              {whatsappUrl && <span className="sr-only"> pelo WhatsApp (abre em nova aba)</span>}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
