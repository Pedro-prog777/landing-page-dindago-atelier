/**
 * ============================================================================
 * EVENTOS ENTRE SEÇÕES
 * ----------------------------------------------------------------------------
 * Algumas chamadas de uma seção agem sobre outra: "Tenho interesse" numa peça
 * preenche o formulário de contato, e um resultado da busca abre a peça na
 * coleção. Em vez de subir estado até o App, as seções conversam por eventos
 * do navegador — cada uma continua independente da outra.
 * ============================================================================
 */

const PREENCHER_CONTATO = 'dindago:preencher-contato';
const ABRIR_PECA = 'dindago:abrir-peca';

export type PreenchimentoDoContato = {
  /** Precisa ser um dos assuntos cadastrados; outro valor é ignorado. */
  assunto?: string;
  mensagem?: string;
};

/** Preenche o formulário de contato. O link `#contato` cuida da rolagem. */
export function preencherContato(dados: PreenchimentoDoContato): void {
  window.dispatchEvent(new CustomEvent(PREENCHER_CONTATO, { detail: dados }));
}

export function aoPreencherContato(
  ouvinte: (dados: PreenchimentoDoContato) => void,
): () => void {
  const tratar = (evento: Event) =>
    ouvinte((evento as CustomEvent<PreenchimentoDoContato>).detail);
  window.addEventListener(PREENCHER_CONTATO, tratar);
  return () => window.removeEventListener(PREENCHER_CONTATO, tratar);
}

/** Id da peça: número no arquivo local, texto quando vem do banco. */
type IdDaPeca = number | string;

/** Abre o diálogo de detalhes de uma peça da coleção. */
export function abrirPeca(id: IdDaPeca): void {
  window.dispatchEvent(new CustomEvent(ABRIR_PECA, { detail: id }));
}

export function aoAbrirPeca(ouvinte: (id: IdDaPeca) => void): () => void {
  const tratar = (evento: Event) => ouvinte((evento as CustomEvent<IdDaPeca>).detail);
  window.addEventListener(ABRIR_PECA, tratar);
  return () => window.removeEventListener(ABRIR_PECA, tratar);
}
