// src/content.config.ts
import { defineCollection, z } from 'astro:content';
// Importamos el nuevo cargador para archivos locales
import { glob } from 'astro/loaders'; 

const exitosCollection = defineCollection({
  // Reemplazamos 'type: content' por el loader apuntando a tu carpeta de éxitos
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/exitos" }),
  schema: z.object({
    cliente: z.string(),
    title: z.string(),
    industria: z.string(),
    servicios: z.array(z.string()), 
    blocks: z.array(z.any()),       
  }),
});

// Exportamos la colección exactamente igual
export const collections = {
  'exitos': exitosCollection,
};