/**
 * Peças do atelier.
 *
 * ⚠️ Os dados moraram aqui até a centralização: agora vivem em
 * `src/data/clientData.ts`. Este módulo apenas reexporta aquele conteúdo e
 * guarda o texto da mensagem de interesse — assim nenhum dado fica duplicado.
 */
import { clientData, type Produto } from './clientData';

export type Product = Produto;

export const products = clientData.products;

export { formatPrice } from '../config/site';

/** Mensagem de WhatsApp já preenchida com o nome da peça. */
export function mensagemInteresse(product: Product): string {
  return `Olá! Tenho interesse na peça “${product.name}” (${product.category}) que vi no site do ${clientData.company.name}. Poderia me contar mais sobre ela?`;
}
