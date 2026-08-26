import { Reveal } from './ui/Reveal';
import { Caderno, Numeral, Xilogravura } from './ui/Catalogo';
import { iconesAtelier, type NomeIcone } from './ui/iconMap';
import { LinkEditorial } from './ui/Button';
import { clientData } from '../data/clientData';

/**
 * Diferenciais em bento assimétrico.
 *
 * O que muda em relação a uma grade de cards: cada bloco tem uma superfície
 * diferente — tinta, tijolo, barro e papel —, os cantos são retos e o lugar
 * do ícone é ocupado por um numeral de caderno. O contraste tonal entre os
 * blocos é o que dá o ritmo, não a moldura.
 */

/** Posição de cada bloco. Composição desenhada: 2×1, 1×1, 1×2, 1×1, 2×1. */
const posicoes = [
  'sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-start-1',
  'sm:col-span-1 lg:col-span-1 lg:col-start-3 lg:row-start-1',
  'sm:col-span-1 lg:col-span-1 lg:col-start-4 lg:row-span-2 lg:row-start-1',
  'sm:col-span-1 lg:col-span-1 lg:col-start-1 lg:row-start-2',
  'sm:col-span-1 lg:col-span-2 lg:col-start-2 lg:row-start-2',
];

/** Superfície de cada bloco: o contraste entre elas é o ritmo da seção. */
const superficies = [
  {
    fundo: 'bg-tinta',
    texto: 'text-papel',
    titulo: 'text-ambar',
    apoio: 'text-papel/70',
    tom: 'claro' as const,
  },
  {
    fundo: 'bg-areia',
    texto: 'text-tinta',
    titulo: 'text-tijolo',
    apoio: 'text-tinta-suave',
    tom: 'escuro' as const,
  },
  {
    fundo: 'bg-tijolo',
    texto: 'text-papel',
    titulo: 'text-papel',
    apoio: 'text-papel/75',
    tom: 'claro' as const,
  },
  {
    fundo: 'bg-papel-claro border border-tinta/12',
    texto: 'text-tinta',
    titulo: 'text-tijolo',
    apoio: 'text-tinta-suave',
    tom: 'escuro' as const,
  },
  {
    fundo: 'bg-papel-escuro',
    texto: 'text-tinta',
    titulo: 'text-tijolo',
    apoio: 'text-tinta-suave',
    tom: 'escuro' as const,
  },
];

export function ValuesSection() {
  const { benefits, benefitsSection } = clientData;

  return (
    <section aria-labelledby="diferenciais-titulo" className="bg-papel py-16 sm:py-20 lg:py-24">
      <div className="px-4 sm:px-6 lg:px-10">
        <Caderno
          numero={benefitsSection.numero}
          titulo={benefitsSection.eyebrow}
          nota="Cinco compromissos"
        />

        <Reveal delay={80} className="pt-8 pb-10 lg:pt-12 lg:pb-14">
          <h2 id="diferenciais-titulo" className="max-w-3xl text-[clamp(1.9rem,5vw,4rem)]">
            {benefitsSection.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[15rem] lg:gap-2.5">
          {benefits.map((valor, indice) => {
            const s = superficies[indice];
            const Icone = iconesAtelier[valor.icon as NomeIcone] ?? iconesAtelier.sol;
            const vertical = indice === 2;
            const chamada = indice === 4;

            return (
              <Reveal
                key={valor.title}
                delay={indice * 70}
                className={`group relative overflow-hidden p-7 transition-colors duration-500 lg:p-8 ${s.fundo} ${s.texto} ${posicoes[indice]}`}
              >
                <div className="flex h-full flex-col justify-between gap-6">
                  <div className="flex items-start justify-between gap-4">
                    {/* Desenho e numeral juntos: identidade e ordem de leitura */}
                    <span
                      className={`shrink-0 transition-transform duration-500 group-hover:scale-110 ${
                        s.tom === 'claro' ? 'text-ambar' : 'text-ocre'
                      }`}
                    >
                      <Icone className="size-11 lg:size-12" strokeWidth={1.3} />
                    </span>

                    <div className="flex items-start gap-4">
                      {vertical && (
                        <Xilogravura className="mt-2 w-12 shrink-0 text-papel/25" altura={8} />
                      )}
                      <Numeral tone={s.tom} className="text-4xl lg:text-5xl">
                        {String(indice + 1).padStart(2, '0')}
                      </Numeral>
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`font-display text-2xl leading-tight lg:text-[1.75rem] ${s.titulo}`}
                    >
                      {valor.title}
                    </h3>
                    <p className={`mt-3 max-w-sm text-sm leading-relaxed ${s.apoio}`}>
                      {valor.description}
                    </p>

                    {chamada && (
                      <LinkEditorial href="#encomendas" className="mt-4">
                        Encomendar uma peça
                      </LinkEditorial>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
