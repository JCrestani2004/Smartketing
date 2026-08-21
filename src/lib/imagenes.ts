import type { ImageMetadata } from "astro";

/**
 * Catálogo de las imágenes de casos de éxito.
 *
 * Los .md de la colección sólo pueden guardar rutas como texto, pero <Image>
 * necesita el objeto ImageMetadata que genera Astro al importar el archivo.
 * Este glob hace de puente entre las dos cosas.
 *
 * Antes estas imágenes vivían en public/, donde Astro las copia tal cual sin
 * optimizar: el caso de Vicone pesaba 2.15 MB. Desde src/assets pasan por el
 * pipeline y salen en WebP con width y height declarados.
 */
const catalogo = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/casos_exito/**/*.{jpeg,jpg,png,webp,avif}",
  { eager: true },
);

/**
 * Devuelve la imagen correspondiente a una ruta del markdown, o undefined si
 * no existe (por ejemplo si alguien escribe mal el nombre en el .md).
 */
export function resolverImagen(ruta: string): ImageMetadata | undefined {
  return catalogo[ruta]?.default;
}
