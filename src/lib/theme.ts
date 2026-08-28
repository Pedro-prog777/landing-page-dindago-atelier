import type { ConteudoDoSite } from '../conteudo/mesclar';

/**
 * ============================================================================
 * TEMA E SEO DINÂMICOS
 * ----------------------------------------------------------------------------
 * Liga as cores e o SEO do conteúdo às variáveis CSS e às metatags. Como o
 * conteúdo agora vem da API, isto roda de novo sempre que ele muda — trocar a
 * paleta no painel repinta o site sem recarregar a página.
 * ============================================================================
 */

/** Cor do conteúdo → variável CSS correspondente da paleta. */
const mapaDeCores = {
  primary: '--color-ocre',
  secondary: '--color-tijolo',
  accent: '--color-ambar',
  background: '--color-papel',
} as const;

const COR_VALIDA = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function aplicarTema(conteudo: ConteudoDoSite): void {
  if (typeof document === 'undefined') return;
  const raiz = document.documentElement;

  for (const [chave, variavel] of Object.entries(mapaDeCores)) {
    const cor = conteudo.colors[chave as keyof typeof mapaDeCores];
    // Ignora valores vazios ou malformados para não quebrar a paleta padrão.
    if (typeof cor === 'string' && COR_VALIDA.test(cor.trim())) {
      raiz.style.setProperty(variavel, cor.trim());
    }
  }
}

/**
 * Sincroniza título e metatags.
 *
 * O `index.html` continua trazendo os mesmos valores escritos à mão — é o que
 * os robôs de busca leem antes do JavaScript rodar.
 */
export function aplicarSeo(conteudo: ConteudoDoSite): void {
  if (typeof document === 'undefined') return;

  const { title, description, url, ogImage } = conteudo.seo;
  if (title) document.title = title;

  const metas: Array<[string, string, string | undefined]> = [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', url],
    ['property', 'og:image', ogImage],
    ['property', 'og:site_name', conteudo.company.name],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', ogImage],
  ];

  for (const [atributo, chave, valor] of metas) {
    if (!valor) continue;
    let tag = document.head.querySelector<HTMLMetaElement>(`meta[${atributo}="${chave}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(atributo, chave);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', valor);
  }
}
