import { ArrowDown, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { SmartImage } from './ui/SmartImage';
import { buildWhatsAppUrl } from '../config/site';

/** Fotografia principal: substitua o arquivo mantendo este caminho. */
const IMAGEM_HERO = '/images/hero/peca-principal.jpg';

export function Hero() {
  const whatsappUrl = buildWhatsAppUrl(
    'Olá! Vim pelo site do Dindagó Atelier e gostaria de conhecer as peças disponíveis.',
  );

  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="textura-papel relative overflow-hidden bg-areia pt-36 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      {/* Camadas decorativas de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-[26rem] rounded-full bg-bege/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 size-[22rem] rounded-full bg-ocre/10 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
        {/* Texto — segundo no mobile, primeiro no desktop */}
        <div className="order-2 w-full max-w-2xl lg:order-1 lg:w-[52%]">
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-terracota/25 bg-creme/70 px-4 py-2 font-sans text-[0.65rem] font-semibold tracking-[0.24em] text-terracota uppercase">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Artesanato autoral em papel-machê
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-titulo"
              className="text-[2.1rem] leading-[1.08] font-light text-marrom sm:text-5xl lg:text-[3.6rem]"
            >
              Arte que nasce da{' '}
              <em className="font-normal text-terracota not-italic">memória</em>, da cultura e
              das mãos.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-marrom-claro sm:text-lg">
              Peças artesanais autorais que carregam histórias, identidade e a beleza da cultura
              nordestina.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#pecas" size="lg">
                Conheça nossas peças
                <ArrowDown className="size-4" aria-hidden="true" />
              </Button>
              <Button href={whatsappUrl ?? '#contato'} variant="outline" size="lg">
                <MessageCircle className="size-4" aria-hidden="true" />
                {whatsappUrl ? 'Fale pelo WhatsApp' : 'Fale com o atelier'}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-6 border-t border-marrom/10 pt-8 sm:grid-cols-3">
              {[
                { valor: '100%', rotulo: 'Feito à mão' },
                { valor: 'Peças', rotulo: 'Únicas e autorais' },
                { valor: 'Papel', rotulo: 'Reaproveitado' },
              ].map((item) => (
                <div key={item.rotulo}>
                  <dt className="font-display text-xl font-normal text-terracota sm:text-2xl">
                    {item.valor}
                  </dt>
                  <dd className="mt-1 font-sans text-[0.72rem] leading-snug tracking-[0.14em] text-marrom-claro uppercase">
                    {item.rotulo}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Imagem — primeira no mobile */}
        <Reveal className="order-1 w-full lg:order-2 lg:w-[48%]" delay={120}>
          <figure className="relative mx-auto max-w-md lg:max-w-none">
            {/* Moldura decorativa deslocada — envolve apenas a imagem, nunca a legenda */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -top-5 -left-5 hidden h-full w-full rounded-[2rem] border border-terracota/30 sm:block"
              />
              <div className="relative overflow-hidden rounded-[2rem] bg-bege shadow-[0_30px_60px_-32px_rgba(67,41,29,0.6)]">
                <SmartImage
                  src={IMAGEM_HERO}
                  alt="Escultura em papel-machê do Dindagó Atelier"
                  placeholderLabel="Fotografia da peça"
                  loading="eager"
                  className="aspect-[4/5] w-full"
                />
              </div>
            </div>
            <figcaption className="mt-5 flex items-center gap-3 font-sans text-xs tracking-[0.12em] text-barro uppercase lg:absolute lg:-bottom-7 lg:left-8 lg:mt-0 lg:rounded-full lg:bg-creme lg:px-5 lg:py-3 lg:shadow-lg">
              <span className="h-px w-6 bg-terracota lg:hidden" aria-hidden="true" />
              Do papel à arte, peça por peça
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
