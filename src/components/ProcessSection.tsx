import { useSite } from '../conteudo/useSite';
import { Reveal } from './ui/Reveal';
import { Caderno } from './ui/Catalogo';
import { Cacto } from './ui/Decorations';

export function ProcessSection() {
  const { conteudo } = useSite();
  const { tutorial } = conteudo;

  return (
    <section
      id="processo"
      aria-labelledby="processo-titulo"
      className="grao relative overflow-hidden bg-papel-escuro py-16 sm:py-20 lg:py-24"
    >
      <Cacto
        className="pointer-events-none absolute right-3 bottom-10 hidden w-14 text-cacto/25 2xl:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Caderno numero={tutorial.numero} titulo={tutorial.eyebrow} nota={tutorial.nota} />

        <div className="grid gap-10 pt-8 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12 lg:pt-12">
          {/* Pergunta e introdução */}
          <Reveal className="lg:col-span-5 lg:row-start-1">
            <h2 id="processo-titulo" className="text-[clamp(2.1rem,4.6vw,3.75rem)]">
              {tutorial.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-tinta-media">
              {tutorial.intro}
            </p>
          </Reveal>

          {/* Materiais essenciais */}
          <ol className="grid gap-3 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            {tutorial.materials.map((material, indice) => (
              <li key={material.name}>
                <Reveal
                  delay={indice * 70}
                  className="group flex h-full flex-col border border-tinta/10 bg-papel-claro p-6 transition-all duration-500 hover:-translate-y-1 hover:border-tijolo/35 hover:shadow-[0_18px_36px_-28px_rgba(74,47,33,0.7)] sm:p-7"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="etiqueta text-tinta-suave">Material</span>
                    <span
                      aria-hidden="true"
                      className="font-display text-4xl leading-none text-tijolo/35 transition-colors duration-500 group-hover:text-tijolo/70 sm:text-5xl"
                    >
                      {String(indice + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-[1.75rem] leading-tight sm:mt-4">{material.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-tinta-media">{material.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* Acabamento */}
          <Reveal delay={120} className="lg:col-span-5 lg:row-start-2 lg:self-end">
            <div className="border-l-2 border-tijolo/50 pl-6">
              <h3 className="font-display text-2xl leading-tight text-tijolo">
                {tutorial.extrasTitle}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-tinta-media">
                {tutorial.extrasText}
              </p>
            </div>
            <ul aria-label="Materiais de acabamento" className="mt-6 flex flex-wrap gap-2">
              {tutorial.extras.map((item) => (
                <li
                  key={item}
                  className="border border-tinta/15 bg-papel px-3 py-1.5 font-sans text-[0.8rem] text-tinta-media"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
