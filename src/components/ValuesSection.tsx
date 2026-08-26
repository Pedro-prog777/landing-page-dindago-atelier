import { Reveal } from './ui/Reveal';
import { iconesAtelier, type NomeIcone } from './ui/iconMap';
import { clientData } from '../data/clientData';

/**
 * Faixa de diferenciais logo abaixo do hero.
 * Os itens vêm de `clientData.benefits`; o campo `icon` escolhe o desenho.
 */
export function ValuesSection() {
  return (
    <section aria-label="Diferenciais do atelier" className="bg-creme pt-4 pb-14 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {clientData.benefits.map((valor, indice) => {
            const Icone = iconesAtelier[valor.icon as NomeIcone] ?? iconesAtelier.sol;
            return (
              <Reveal
                as="li"
                key={valor.title}
                delay={indice * 70}
                /* Divisórias finas entre as colunas, como na identidade impressa */
                className="group border-marrom/15 xl:border-l xl:px-6 xl:first:border-l-0"
              >
                <div className="flex items-start gap-4 xl:flex-col xl:items-center xl:gap-4 xl:text-center">
                  <span className="text-ocre transition-transform duration-500 group-hover:scale-110">
                    <Icone className="size-10 sm:size-11" strokeWidth={1.4} />
                  </span>
                  <div>
                    <h3 className="font-sans text-[0.76rem] font-bold tracking-[0.14em] text-terracota uppercase">
                      {valor.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-marrom-claro xl:mx-auto">
                      {valor.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
