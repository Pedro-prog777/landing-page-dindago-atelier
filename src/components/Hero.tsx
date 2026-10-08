import { useSite } from '../conteudo/useSite';
import { Button, LinkEditorial } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';
import { Fio, Xilogravura } from './ui/Catalogo';
import { PapelRasgado } from './ui/Decorations';

/**
 * Capa do catálogo.
 *
 * A manchete atravessa a largura da página em degrau e, logo abaixo, entra a
 * prancha de abertura — a lógica não é "texto de um lado, imagem do outro", e
 * sim capa e prancha, como numa publicação impressa. A grade de colunas
 * aparece em fio finíssimo ao fundo.
 *
 * A prancha é exibida na proporção original da arte (1280×788): a ilustração
 * tem moldura e texto ("Eu amo meu Nordeste"), e qualquer corte comia letras.
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
      {/* Bloco da capa: tudo o que fica SOBRE a ilustração de fundo. */}
      <div className="relative">
        {/*
         * Fundo ilustrado do sertão, ancorado embaixo: os cactos e a cercadura
         * do pé encostam na prancha. Se o arquivo não existir, a camada não
         * pinta nada e o `bg-papel` da seção continua valendo.
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

        <div className="relative mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8 lg:pb-14">
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

          {/* MANCHETE — atravessa a largura toda, em degrau */}
          <h1 id="hero-titulo" className="pt-9 pb-8 sm:pt-12 lg:pt-16 lg:pb-12">
            {hero.titleLines.map((linha, indice) => (
              <Reveal
                key={linha}
                delay={indice * 90}
                className={`block text-[clamp(2.5rem,6.2vw,5.5rem)] ${
                  indice === 1 ? 'sm:pl-[8%] lg:pl-[12%]' : ''
                }`}
              >
                {linha}
              </Reveal>
            ))}
            <Reveal
              delay={180}
              className="block text-[clamp(2.5rem,6.2vw,5.5rem)] text-tijolo italic sm:pl-[16%] lg:pl-[26%]"
            >
              {hero.titleHighlight}
            </Reveal>
          </h1>

          {/* Faixa de apoio: o que é, as chamadas e o colofão */}
          <Reveal delay={240}>
            <Fio />
            <div className="grid gap-8 pt-8 lg:grid-cols-12 lg:gap-10">
              <p className="max-w-xl text-[1.05rem] leading-relaxed text-tinta-media lg:col-span-6 lg:text-lg xl:col-span-5">
                {hero.subtitle}
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 lg:col-span-6 lg:items-start xl:col-span-3 xl:col-start-6 xl:flex-col xl:gap-3">
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
              <dl className="grid max-w-xl grid-cols-3 gap-4 border-t border-tinta/15 pt-6 lg:col-span-12 xl:col-span-4 xl:col-start-9 xl:border-t-0 xl:pt-0">
                {hero.colofao.map((item) => (
                  <div key={item.rotulo}>
                    <dt className="etiqueta text-tinta-suave">{item.rotulo}</dt>
                    {/* Hífen inseparável: "Papel-machê" não quebra no meio em coluna estreita */}
                    <dd className="mt-1.5 font-display text-lg leading-tight">
                      {item.valor.replace(/-/g, '‑')}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>

      {/*
       * PRANCHA DE ABERTURA — sangria total no celular; no desktop, deslocada
       * para a direita, continuando o degrau da manchete, com a legenda na
       * margem esquerda como num catálogo.
       */}
      <div className="relative mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Reveal delay={120}>
          <figure className="group lg:grid lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="overflow-hidden bg-areia sm:shadow-[0_30px_60px_-40px_rgba(74,47,33,0.8)] lg:col-span-10 lg:col-start-3 lg:row-start-1">
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

            <figcaption className="flex items-center justify-between gap-6 px-4 py-3 sm:px-0 lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:flex-col lg:items-start lg:justify-end lg:gap-4 lg:py-0">
              <span className="etiqueta text-tinta-suave">
                fig. 01 — {hero.imageCaption}
              </span>
              <Xilogravura className="hidden w-24 shrink-0 text-tijolo/40 sm:block" altura={8} />
            </figcaption>
          </figure>
        </Reveal>
      </div>

      {/* Transição de papel rasgado para o caderno seguinte */}
      <PapelRasgado posicao="baixo" className="relative mt-10 text-papel lg:mt-14" />
    </section>
  );
}
