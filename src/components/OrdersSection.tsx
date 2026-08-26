import { Reveal } from './ui/Reveal';
import { Button } from './ui/Button';
import { Caderno, Numeral } from './ui/Catalogo';
import { buildWhatsAppUrl } from '../config/site';
import { clientData } from '../data/clientData';

/**
 * Caderno de encomendas — quadrantes.
 *
 * As quatro etapas ocupam quadrantes de uma grade cruzada por fios, com o
 * numeral em marca-d'água no canto. A chamada final sai em sangria total sobre
 * tijolo, com a tipografia em corpo de capa.
 */
export function OrdersSection() {
  const { orders } = clientData;
  const whatsappUrl = buildWhatsAppUrl(
    `Olá! Gostaria de conversar sobre uma encomenda personalizada com o ${clientData.company.name}.`,
  );

  return (
    <section
      id="encomendas"
      aria-labelledby="encomendas-titulo"
      className="grao bg-papel pt-16 sm:pt-20 lg:pt-24"
    >
      <div className="px-4 sm:px-6 lg:px-10">
        <Caderno numero={orders.numero} titulo={orders.eyebrow} nota="Quatro tempos" />

        <div className="grid gap-8 pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-14">
          <Reveal className="lg:col-span-7">
            <h2 id="encomendas-titulo" className="text-[clamp(2.2rem,6vw,4.75rem)]">
              {orders.title}
            </h2>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p className="text-base leading-relaxed text-tinta-suave">{orders.subtitle}</p>
          </Reveal>
        </div>

        {/* Quadrantes */}
        <ol className="mt-14 grid grid-cols-1 border-t border-tinta/15 sm:grid-cols-2 lg:mt-20">
          {orders.steps.map((etapa, indice) => (
            <li
              key={etapa.number}
              className="group relative overflow-hidden border-b border-tinta/15 sm:odd:border-r"
            >
              <Reveal
                delay={indice * 80}
                className="relative h-full px-0 py-10 transition-colors duration-500 group-hover:bg-papel-escuro/50 sm:px-8 lg:px-12 lg:py-14"
              >
                <Numeral className="absolute -top-2 right-2 text-[7rem] transition-colors duration-500 group-hover:text-tijolo/40 lg:right-6 lg:text-[9rem]">
                  {etapa.number}
                </Numeral>

                <div className="relative max-w-sm">
                  <span className="etiqueta text-tijolo">Etapa {etapa.number}</span>
                  <h3 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight">
                    {etapa.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-tinta-suave">{etapa.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* CHAMADA FINAL — sangria total sobre tijolo */}
      <Reveal delay={100} className="grao grao-claro mt-16 bg-tijolo lg:mt-20">
        <div className="grid gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:items-end lg:gap-10 lg:px-10 lg:py-24">
          <div className="lg:col-span-8">
            <h3 className="text-[clamp(2rem,5.4vw,4.25rem)] text-papel">{orders.ctaTitle}</h3>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-papel/75">
              {orders.ctaText}
            </p>
          </div>

          <div className="lg:col-span-3 lg:col-start-10 lg:justify-self-end lg:pb-3">
            <Button href={whatsappUrl ?? '#contato'} variant="claro" size="lg">
              {orders.ctaLabel}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
