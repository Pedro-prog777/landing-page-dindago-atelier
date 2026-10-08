import { clientData, type Produto } from './clientData';

export type Product = Produto;

/** Mensagem de WhatsApp já preenchida com o nome da peça. */
export function mensagemInteresse(product: Product): string {
  return `Olá! Tenho interesse na peça “${product.name}” (${product.category}) que vi no site do ${clientData.company.name}. Poderia me contar mais sobre ela?`;
}
