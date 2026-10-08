import { useSite } from '../conteudo/useSite';
import { Reveal } from './ui/Reveal';
import { LinkEditorial } from './ui/Button';
import { Fio, Xilogravura } from './ui/Catalogo';
import { iconesAtelier, type NomeIcone } from './ui/iconMap';

/**
 * Caderno escuro — o ponto de virada da leitura.
 *
 * Depois de duas seções sobre papel claro, a página vira tinta. A apresentação
 * do atelier entra como um grande destaque de abertura e os valores se alinham
 * numa faixa horizontal separada por fios, com o motivo de xilogravura usado
 * como marca de leitura.
 */
export function CultureSection() {
  const { conteudo: clientData } = useSite();
  const { about, culture, cultureSection } = clientData;

  return (
    <section
      id="cultura"
      aria-labelledby="cultura-titulo"
      className="grao grao-claro bg-tinta py-16 text-papel sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Fio tone="claro" />
          <div className="flex items-baseline justify-between gap-6 py-3">
            <span className="etiqueta text-ambar">
              {cultureSection.numero} — {cultureSection.eyebrow}
            </span>
            <Xilogravura className="hidden w-20 text-papel/20 sm:block" altura={7} />
          </div>
        </Reveal>

        {/* Destaque de abertura, deslocado da margem */}
        <Reveal delay={90} className="py-12 sm:py-14 lg:py-20 lg:pl-[8%]">
          <h2
            id="cultura-titulo"
            className="max-w-5xl text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.08]! text-papel"
          >
            {about.intro}
          </h2>
          <LinkEditorial href="#historia" tone="claro" className="mt-8 sm:mt-10">
            {about.ctaLabel}
          </LinkEditorial>
        </Reveal>

        {/* Valores em faixa horizontal, divididos por fios */}
        <Fio tone="claro" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {culture.map((bloco, indice) => {
            const Icone = iconesAtelier[bloco.icon as NomeIcone] ?? iconesAtelier.sol;
            return (
              <li
                key={bloco.title}
                className="group border-b border-papel/15 sm:odd:pr-6 sm:even:pl-6 sm:even:border-l lg:border-r lg:border-b-0 lg:border-l-0 lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0 lg:even:pl-7"
              >
                <Reveal delay={indice * 80} className="h-full py-6 sm:py-9">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-ambar transition-transform duration-500 group-hover:scale-110">
                      <Icone className="size-10 sm:size-11" strokeWidth={1.25} />
                    </span>
                    <span aria-hidden="true" className="etiqueta text-ambar/70">
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-papel sm:mt-4">
                    {bloco.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-papel/75">
                    {bloco.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-6 hidden h-px w-10 bg-ambar/40 transition-all duration-500 group-hover:w-20 sm:block"
                  />
                </Reveal>
              </li>
            );
          })}
        </ul>
        <Fio tone="claro" />
      </div>
    </section>
  );
}
