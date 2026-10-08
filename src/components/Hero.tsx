import { useSite } from '../conteudo/useSite';
import { Button, LinkEditorial } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';
import { Fio, Xilogravura } from './ui/Catalogo';
import { PapelRasgado } from './ui/Decorations';

/**
 * Capa do catálogo.
 *
 * No desktop, a manchete em degrau ocupa a metade esquerda e a prancha "Eu amo
 * meu Nordeste" a direita, levemente inclinada como uma gravura presa na
 * parede — assim a arte aparece inteira já na primeira tela, inclusive em
 * notebooks (1366×768, 1536×864). Antes ela vinha abaixo da manchete e só
 * aparecia depois de rolar, grande demais para caber na janela.
 *
 * A prancha é exibida na proporção original da arte (1280×788): a ilustração
 * tem moldura e texto, e qualquer corte comia letras. No celular ela entra
 * em sangria total logo depois das chamadas.
 */
export function Hero() {
  const { conteudo: clientData, resolveCtaHref } = useSite();
  const { hero, company } = clientData;
  const hrefPrimario = resolveCtaHref(hero.primaryCta.href);
  const hrefSecundario = resolveCtaHref(
    hero.secondaryCta.href,
    `Olá! Vim pelo site do ${company.name} e gostaria de conhecer as peças disponíveis.`,
  );

  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="grao relative bg-papel pt-26 sm:pt-28"
    >
      <div className="relative">
        {/*
         * Fundo ilustrado do sertão, ancorado embaixo: os cactos e a cercadura
         * do pé fecham a capa. Se o arquivo não existir, a camada não pinta
         * nada e o `bg-papel` da seção continua valendo.
         */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/bg-nordeste.jpg')] bg-cover bg-bottom bg-no-repeat"
        />
        {/*
         * Véu de papel. Medido, não estimado: o pixel mais escuro da arte é
         * RGB(73,23,0), e a manchete sobre ele daria 1.22:1 — ilegível. O véu a
         * 72% leva esse pior caso a 6.34:1 no texto e 3.18:1 na linha em tijolo.
         * 72% é o piso, não uma escolha estética.
         */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-papel/72" />

        {/* Grade de impressão ao fundo, quase imperceptível */}
        <div
          aria-hidden="true"
          className="grade-impressao pointer-events-none absolute inset-x-0 top-0 hidden h-full lg:block"
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
          {/* Cabeçalho corrente da capa: diz logo de saída o que é o atelier */}
          <Reveal>
            <Fio />
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
              <span className="etiqueta text-tijolo">01 — Capa</span>
              <span className="etiqueta tracking-[0.12em] text-tinta-media sm:tracking-[0.2em]">
                {company.segment}
              </span>
            </div>
            <Fio />
          </Reveal>

          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-12">
            {/* Texto da capa */}
            <div className="lg:col-span-6">
              <h1 id="hero-titulo" className="pt-9 pb-8 sm:pt-12 lg:pt-10 lg:pb-8">
                {hero.titleLines.map((linha, indice) => (
                  <Reveal
                    key={linha}
                    delay={indice * 90}
                    className={`block text-[clamp(2.5rem,6.2vw,5.5rem)] lg:text-[clamp(2.75rem,4.1vw,4.25rem)] ${
                      indice === 1 ? 'sm:pl-[8%] lg:pl-[6%]' : ''
                    }`}
                  >
                    {linha}
                  </Reveal>
                ))}
                <Reveal
                  delay={180}
                  className="block text-[clamp(2.5rem,6.2vw,5.5rem)] text-tijolo italic sm:pl-[16%] lg:pl-[14%] lg:text-[clamp(2.75rem,4.1vw,4.25rem)]"
                >
                  {hero.titleHighlight}
                </Reveal>
              </h1>

              {/* Faixa de apoio: o que é, as chamadas e o colofão */}
              <Reveal delay={240}>
                <Fio />
                <div className="flex flex-col gap-6 pt-6">
                  <p className="max-w-xl text-[1.05rem] leading-relaxed text-tinta-media lg:text-[1.1rem]">
                    {hero.subtitle}
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                    <Button href={hrefPrimario} size="lg" className="w-full sm:w-auto">
                      {hero.primaryCta.label}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover/btn:translate-y-0.5"
                      >
                        ↓
                      </span>
                    </Button>
                    <LinkEditorial href={hrefSecundario}>{hero.secondaryCta.label}</LinkEditorial>
                  </div>

                  {/* Colofão — ficha técnica curta da edição */}
                  <dl className="grid max-w-lg grid-cols-3 gap-4 border-t border-tinta/15 pt-5">
                    {hero.colofao.map((item) => (
                      <div key={item.rotulo}>
                        <dt className="etiqueta text-tinta-suave">{item.rotulo}</dt>
                        {/* Hífen inseparável: "Papel-machê" não quebra no meio */}
                        <dd className="mt-1.5 font-display text-lg leading-tight">
                          {item.valor.replace(/-/g, '‑')}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>

            {/* PRANCHA DE ABERTURA — inteira, na proporção original da arte */}
            <Reveal delay={150} className="-mx-4 mt-10 sm:mx-0 sm:mt-12 lg:col-span-6 lg:mt-0">
              <figure className="group">
                <div className="overflow-hidden bg-areia shadow-[0_30px_60px_-34px_rgba(74,47,33,0.85)] transition-transform duration-700 ease-out sm:ring-1 sm:ring-tinta/10 lg:-rotate-1 lg:group-hover:rotate-0">
                  <SmartImage
                    src={hero.image}
                    alt={hero.imageAlt}
                    placeholderLabel="Prancha de abertura"
                    figura="01"
                    loading="eager"
                    prioridade
                    className="aspect-1280/788 w-full transition-transform duration-[1.4s] ease-out group-hover:scale-[1.02]"
                  />
                </div>

                <figcaption className="flex items-center justify-between gap-6 px-4 pt-4 sm:px-0">
                  <span className="etiqueta text-tinta-suave">fig. 01 — {hero.imageCaption}</span>
                  <Xilogravura className="hidden w-20 shrink-0 text-tijolo/40 sm:block" altura={8} />
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Transição de papel rasgado para o caderno seguinte */}
      <PapelRasgado posicao="baixo" className="relative text-papel" />
    </section>
  );
}
