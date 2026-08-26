import { clientData } from '../data/clientData';

/**
 * ============================================================================
 * TEMA DINÂMICO
 * ----------------------------------------------------------------------------
 * Liga `clientData.colors` às variáveis CSS que o Tailwind já usa em todas as
 * classes (`bg-ocre`, `text-terracota`, ...). Trocar as quatro cores do
 * clientData repinta a página inteira — sem editar CSS nem componente algum.
 *
 * Os valores padrão continuam no `src/index.css`; aqui apenas sobrescrevemos
 * quando o cliente define uma cor própria.
 * ============================================================================
 */

/** Cor do clientData → variável CSS correspondente da paleta. */
const mapaDeCores: Record<keyof typeof clientData.colors, string> = {
  primary: '--color-ocre',
  secondary: '--color-terracota',
  accent: '--color-amarelo',
  background: '--color-creme',
};

const COR_VALIDA = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function applyTheme(): void {
  if (typeof document === 'undefined') return;

  const raiz = document.documentElement;

  for (const [chave, variavel] of Object.entries(mapaDeCores)) {
    const cor = clientData.colors[chave as keyof typeof clientData.colors];
    // Ignora valores vazios ou malformados para não quebrar a paleta padrão.
    if (typeof cor === 'string' && COR_VALIDA.test(cor.trim())) {
      raiz.style.setProperty(variavel, cor.trim());
    }
  }
}

/**
 * Sincroniza título e metatags com `clientData.seo`.
 *
 * O `index.html` continua trazendo os mesmos valores escritos à mão — é o que
 * os robôs de busca leem antes do JavaScript rodar. Esta função garante que,
 * ao trocar de cliente, a aba do navegador e o compartilhamento acompanhem o
 * clientData mesmo que alguém esqueça de atualizar o HTML.
 */
export function applySeo(): void {
  if (typeof document === 'undefined') return;

  const { title, description, url, ogImage } = clientData.seo;
  document.title = title;

  const metas: Array<[string, string, string]> = [
    ['name', 'description', description],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', url],
    ['property', 'og:image', ogImage],
    ['property', 'og:site_name', clientData.company.name],
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
