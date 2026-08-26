import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { formatPrice, mensagemInteresse, type Product } from '../data/products';
import { buildWhatsAppUrl } from '../config/site';
import { SmartImage } from './ui/SmartImage';

/**
 * Três apresentações para a mesma peça, para a seção fugir da fila de cards:
 *
 *  destaque — bloco grande, informação sobreposta à fotografia
 *  compacto — bloco pequeno, informação abaixo da fotografia
 *  largo    — bloco horizontal, fotografia à esquerda e texto à direita
 */
export type VarianteProduto = 'destaque' | 'compacto' | 'largo';

type ProductCardProps = {
  product: Product;
  variante?: VarianteProduto;
  /** Numeração editorial exibida no canto do espaço da imagem. */
  indice?: string;
  aoVerDetalhes: (product: Product) => void;
};

export function ProductCard({
  product,
  variante = 'compacto',
  indice,
  aoVerDetalhes,
}: ProductCardProps) {
  const whatsappUrl = buildWhatsAppUrl(mensagemInteresse(product));

  /*
   * O bloco de destaque não fixa proporção: ele estica até a altura das duas
   * peças empilhadas na coluna ao lado, fechando a composição sem sobra.
   * Os demais mantêm proporção própria.
   */
  const proporcao =
    variante === 'destaque'
      ? 'min-h-[28rem] lg:min-h-0'
      : variante === 'largo'
        ? 'aspect-4/3'
        : 'aspect-square';

  const imagem = (
    <div className="relative h-full flex-1 overflow-hidden bg-bege">
      <SmartImage
        src={product.image}
        alt={product.imageAlt}
        placeholderLabel={variante === 'destaque' ? 'Peça em destaque' : 'Peça'}
        indice={indice}
        className={`h-full w-full ${proporcao} transition-transform duration-[1.1s] ease-out group-hover:scale-[1.05]`}
      />
      {product.badge && (
        <span className="absolute top-4 left-4 rounded-full bg-creme/92 px-3 py-1.5 font-sans text-[0.58rem] font-semibold tracking-[0.18em] text-terracota uppercase backdrop-blur-sm">
          {product.badge}
        </span>
      )}
    </div>
  );

  const botaoInteresse = (claro: boolean) => (
    <a
      href={whatsappUrl ?? '#contato'}
      {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={`Tenho interesse na peça ${product.name}`}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 font-sans text-[0.65rem] font-semibold tracking-[0.14em] uppercase transition ${
        claro
          ? 'border border-creme/40 text-creme hover:bg-creme hover:text-marrom'
          : 'bg-terracota text-creme hover:bg-barro'
      }`}
    >
      <MessageCircle className="size-3.5" aria-hidden="true" />
      Tenho interesse
    </a>
  );

  // ------------------------------------------------------------------ DESTAQUE
  if (variante === 'destaque') {
    return (
      <article className="group relative flex h-full min-h-[28rem] flex-col overflow-hidden rounded-bloco">
        {imagem}

        {/* Informação sobreposta à fotografia, sobre um véu de gradiente */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-marrom/95 via-marrom/70 to-transparent p-7 pt-24 sm:p-9 sm:pt-28">
          <p className="font-sans text-[0.6rem] font-semibold tracking-[0.22em] text-amarelo uppercase">
            {product.category}
          </p>
          <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-light text-creme">
            {product.name}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-creme/80">
            {product.description}
          </p>
          <p className="mt-4 font-display text-lg text-amarelo">{formatPrice(product.price)}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => aoVerDetalhes(product)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-creme px-5 font-sans text-[0.65rem] font-semibold tracking-[0.14em] text-marrom uppercase transition hover:bg-amarelo"
            >
              Ver detalhes
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </button>
            {botaoInteresse(true)}
          </div>
        </div>
      </article>
    );
  }

  // --------------------------------------------------------------------- LARGO
  if (variante === 'largo') {
    return (
      <article className="group grid h-full overflow-hidden rounded-bloco border border-bege-escuro/50 bg-areia/60 sm:grid-cols-2">
        {imagem}
        <div className="flex flex-col justify-center gap-4 p-7 sm:p-10">
          <div>
            <p className="font-sans text-[0.6rem] font-semibold tracking-[0.22em] text-terracota uppercase">
              {product.category}
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-light text-marrom">
              {product.name}
            </h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-marrom-claro sm:text-base">
            {product.description}
          </p>
          <p className="font-display text-lg text-barro">{formatPrice(product.price)}</p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => aoVerDetalhes(product)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-marrom/25 px-5 font-sans text-[0.65rem] font-semibold tracking-[0.14em] text-marrom uppercase transition hover:border-marrom hover:bg-marrom hover:text-creme"
            >
              Ver detalhes
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            {botaoInteresse(false)}
          </div>
        </div>
      </article>
    );
  }

  // ------------------------------------------------------------------ COMPACTO
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-4xl border border-bege-escuro/50 bg-creme transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-32px_rgba(67,41,29,0.7)]">
      {imagem}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div>
          <p className="font-sans text-[0.58rem] font-semibold tracking-[0.2em] text-terracota uppercase">
            {product.category}
          </p>
          <h3 className="mt-1.5 font-display text-xl leading-tight font-normal text-marrom">
            {product.name}
          </h3>
        </div>
        <p className="flex-1 text-sm leading-relaxed text-marrom-claro">{product.description}</p>
        <p className="font-display text-base text-barro">{formatPrice(product.price)}</p>
        <button
          type="button"
          onClick={() => aoVerDetalhes(product)}
          className="mt-1 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-marrom/25 px-4 font-sans text-[0.64rem] font-semibold tracking-[0.14em] text-marrom uppercase transition hover:border-marrom hover:bg-marrom hover:text-creme"
        >
          Ver detalhes
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}
