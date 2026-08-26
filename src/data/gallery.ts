/**
 * Galeria.
 *
 * ⚠️ Os dados vivem em `src/data/clientData.ts` (`gallery`). Este módulo só
 * reexporta, para os componentes continuarem com imports curtos.
 */
import { clientData, type ItemGaleria } from './clientData';

export type GalleryItem = ItemGaleria;
export type GalleryCategory = string;

export const galleryCategories = clientData.gallery.categories;
export const galleryItems = clientData.gallery.items;
