import { Flame, HeartHandshake, Hourglass, Users, type LucideIcon } from 'lucide-react';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

type Bloco = {
  icone: LucideIcon;
  titulo: string;
  descricao: string;
};

const blocos: Bloco[] = [
  {
    icone: Flame,
    titulo: 'Arte que transforma',
    descricao: 'Materiais simples transformados em obras carregadas de significado.',
  },
  {
    icone: Users,
    titulo: 'Cultura que conecta',
    descricao:
      'Peças inspiradas nas histórias, tradições e manifestações culturais do Nordeste.',
  },
  {
    icone: Hourglass,
    titulo: 'Memória que permanece',
    descricao: 'Esculturas que preservam histórias e atravessam gerações.',
  },
  {
    icone: HeartHandshake,
    titulo: 'Mãos que criam',
    descricao: 'O trabalho artesanal como expressão de identidade, criatividade e afeto.',
  },
];

export function CultureSection() {
  return (
    <section
      aria-labelledby="cultura-titulo"
      className="relative overflow-hidden bg-marrom py-20 sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 size-[30rem] rounded-full bg-terracota/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-40 size-[32rem] rounded-full bg-ocre/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="cultura-titulo"
          eyebrow="Cultura popular"
          title="O que sustenta cada obra"
          description="Antes de ser objeto, a peça é história. É isso que atravessa o trabalho do atelier de ponta a ponta."
          tone="dark"
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-creme/12 sm:grid-cols-2 lg:grid-cols-4">
          {blocos.map((bloco, indice) => {
            const Icone = bloco.icone;
            return (
              <Reveal
                as="li"
                key={bloco.titulo}
                delay={indice * 80}
                className="group bg-marrom p-7 transition-colors duration-500 hover:bg-marrom-claro/40 sm:p-8"
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-amarelo/30 text-amarelo transition-colors duration-300 group-hover:bg-amarelo group-hover:text-marrom">
                  <Icone className="size-5" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-sans text-[0.78rem] font-bold tracking-[0.16em] text-creme uppercase">
                  {bloco.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-creme/70">{bloco.descricao}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
