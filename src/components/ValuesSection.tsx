import { Hand, Leaf, Package, PenTool, Sun, type LucideIcon } from 'lucide-react';
import { Reveal } from './ui/Reveal';

type Valor = {
  icone: LucideIcon;
  titulo: string;
  descricao: string;
};

const valores: Valor[] = [
  {
    icone: Hand,
    titulo: 'Feito à mão',
    descricao: 'Peças únicas, produzidas artesanalmente com dedicação e cuidado.',
  },
  {
    icone: Leaf,
    titulo: 'Sustentável',
    descricao: 'Utilização consciente de papel e materiais reaproveitados.',
  },
  {
    icone: Sun,
    titulo: 'Identidade nordestina',
    descricao: 'Obras inspiradas na cultura, nas histórias e nas tradições do Nordeste.',
  },
  {
    icone: PenTool,
    titulo: 'Autoral',
    descricao: 'Criações exclusivas que carregam memória, pesquisa e significado.',
  },
  {
    icone: Package,
    titulo: 'Encomendas',
    descricao: 'Peças personalizadas desenvolvidas especialmente para cada cliente.',
  },
];

export function ValuesSection() {
  return (
    <section aria-labelledby="valores-titulo" className="bg-creme py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Título só para leitores de tela: mantém a hierarquia h1 > h2 > h3 sem poluir o visual */}
        <h2 id="valores-titulo" className="sr-only">
          Diferenciais do Dindagó Atelier
        </h2>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {valores.map((valor, indice) => {
            const Icone = valor.icone;
            return (
              <Reveal as="li" key={valor.titulo} delay={indice * 70} className="group">
                <div className="flex items-start gap-4 xl:flex-col xl:gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-terracota/20 bg-areia text-terracota transition-colors duration-300 group-hover:bg-terracota group-hover:text-creme">
                    <Icone className="size-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-[0.78rem] font-bold tracking-[0.16em] text-marrom uppercase">
                      {valor.titulo}
                    </h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-marrom-claro">
                      {valor.descricao}
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
