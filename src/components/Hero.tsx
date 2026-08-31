import { useSite } from '../conteudo/useSite';
import { Button, LinkEditorial } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';
import { Fio, Xilogravura } from './ui/Catalogo';
import { PapelRasgado } from './ui/Decorations';

/**
 * Capa do catálogo.
 *
 * A manchete atravessa a largura inteira da página, sem caixa central, e a
 * prancha de abertura entra em sangria total logo abaixo — a lógica não é
 * "texto de um lado, imagem do outro", e sim capa e prancha, como numa
 * publicação impressa. A grade de colunas aparece em fio finíssimo ao fundo.
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
      className="grao relative bg-papel pt-24 sm:pt-28"
    >
      {/*
       * Bloco da capa: tudo o que fica SOBRE a ilustração de fundo.
       *
       * O fundo precisa terminar exatamente onde a prancha de abertura começa.
       * Enquanto ele cobria a seção inteira, o rodapé da ilustração — onde
       * ficam os cactos e a cercadura — caía atrás da prancha, que é opaca, e
       * simplesmente não aparecia.
       */}
      <div className="relative">
        {/*
         * Fundo ilustrado do sertão.
         *
         * Fica numa camada própria, e não no `background` da seção, por dois
         * motivos: o `grao` já ocupa o ::after, e assim o véu de papel logo
         * abaixo pode clarear a arte sem clarear junto o texto.
         *
         * Ancorado embaixo: a ilustração é uma moldura, e o que mais identifica
         * ela são os cactos e a cercadura do pé. Com `bottom` eles encostam na
         * prancha. O corte come um pouco do topo, onde a arte é mais esparsa —
         * é a troca que faz valer a pena.
         *
         * Se o arquivo não existir, esta camada não pinta nada e o `bg-papel`
         * da seção continua valendo — a capa não quebra.
         */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[url('/bg-nordeste.jpg')] bg-cover bg-bottom bg-no-repeat"
        />
        {/*
         * Véu de papel. Medido, não estimado: o pixel mais escuro da arte é
         * RGB(73,23,0), e a manchete sobre ele daria 1.22:1 — ilegível. O véu a
         * 72% leva esse pior caso a 6.34:1 no texto e 3.18:1 na linha em tijolo,
         * acima dos 4.5 e 3.0 exigidos, e ainda deixa a textura aparecer.
         *
         * 72% é o piso, não uma escolha estética: abaixo disso a linha em tijolo
         * cai de 3.0 — ela é a mais frágil, porque #a0472c tem luminância
         * próxima da terracota da ilustração.
         */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-papel/72" />

        {/* Grade de impressão ao fundo, quase imperceptível */}
        <div
          aria-hidden="true"
          className="grade-impressao pointer-events-none absolute inset-x-0 top-0 hidden h-full lg:block"
        />

        {/*
         * Os SVGs de sol e pássaros saíram daqui.
         *
         * Eles existiam para desenhar os cantos enquanto a ilustração de fundo
         * era cortada. Agora que ela cabe e aparece inteira, a própria arte já
         * traz sol, pássaros e folha nos mesmos pontos — manter os dois punha
         * dois sóis lado a lado no canto direito.
         *
         * `Sol` e `Passaros` continuam exportados em ui/Decorations, mas esta
         * era a única tela que os usava: hoje não são chamados em lugar nenhum.
         * Ficam disponíveis para outras seções; se seguirem sem uso, cabe
         * removê-los numa limpeza à parte.
         */}

        <div className="relative mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
          {/* Cabeçalho corrente da capa */}
          <Reveal>
            <Fio />
            <div className="flex items-baseline justify-between gap-6 py-3">
              <span className="etiqueta text-tijolo">01 — Capa</span>
              <span className="etiqueta hidden text-tinta/45 sm:block">{company.segment}</span>
            </div>
            <Fio />
          </Reveal>

          {/* MANCHETE — atravessa a largura toda, em degrau */}
          <h1 id="hero-titulo" className="pt-10 pb-8 sm:pt-14 lg:pt-20 lg:pb-12">
            {hero.titleLines.map((linha, indice) => (
              <Reveal
                key={linha}
                delay={indice * 90}
                className={`block text-[clamp(2.1rem,5.6vw,4.5rem)] ${
                  indice === 1 ? 'lg:pl-[12%]' : ''
                }`}
              >
                {linha}
              </Reveal>
            ))}
            <Reveal
              delay={180}
              className="block text-[clamp(2.1rem,5.6vw,4.5rem)] text-tijolo lg:pl-[26%]"
            >
              {hero.titleHighlight}
            </Reveal>
          </h1>

          {/* Faixa de apoio: resumo, chamadas e colofão */}
          <Reveal delay={240}>
            <Fio />
            <div className="grid gap-8 py-8 lg:grid-cols-12 lg:gap-10">
              <p className="max-w-md text-base leading-relaxed text-tinta-suave lg:col-span-4">
                {hero.subtitle}
              </p>

              <div className="flex flex-wrap items-start gap-4 lg:col-span-4">
                <Button href={hrefPrimario} size="lg">
                  {hero.primaryCta.label}
                </Button>
                <LinkEditorial href={hrefSecundario} className="pt-4">
                  {hero.secondaryCta.label}
                </LinkEditorial>
              </div>

              {/* Colofão — ficha técnica curta da edição */}
              <dl className="grid grid-cols-3 gap-4 lg:col-span-3 lg:col-start-10">
                {hero.colofao.map((item) => (
                  <div key={item.rotulo}>
                    <dt className="etiqueta text-tinta/40">{item.rotulo}</dt>
                    <dd className="mt-1.5 font-display text-lg leading-tight">{item.valor}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>

      {/* PRANCHA DE ABERTURA — sangria total, de borda a borda */}
      <Reveal delay={120} className="group relative">
        <figure className="relative">
          <div className="overflow-hidden bg-areia">
            <SmartImage
              src={hero.image}
              alt={hero.imageAlt}
              placeholderLabel="Prancha de abertura"
              figura="01"
              loading="eager"
              className="aspect-4/5 w-full transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03] sm:aspect-[16/9] lg:aspect-[24/9]"
            />
          </div>

          <figcaption className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
            <span className="etiqueta text-tinta/50">fig. 01 — {hero.imageCaption}</span>
            <Xilogravura className="hidden w-24 shrink-0 text-tijolo/30 sm:block" altura={8} />
          </figcaption>
        </figure>
      </Reveal>

      {/* Transição de papel rasgado para o caderno seguinte */}
      <PapelRasgado posicao="baixo" className="relative text-papel" />
    </section>
  );
}
