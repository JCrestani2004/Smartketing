// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dirección oficial del sitio. La usan el sitemap, las URLs canónicas
  // y las etiquetas Open Graph para generar enlaces absolutos.
  site: 'https://brandoorsestudio.com',

  // Tipografías auto-alojadas. Astro las descarga en el build y las sirve desde
  // nuestro dominio, así el navegador no tiene que esperar a parsear el CSS para
  // descubrir fonts.googleapis.com. Se exponen como variables CSS que consume
  // el bloque @theme de global.css.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-jakarta',
      // Fuente variable: declarar el rango completo no añade archivos.
      weights: ['200 800'],
      styles: ['normal', 'italic'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['300 700'],
      styles: ['normal', 'italic'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--font-grotesk',
      weights: ['300 700'],
      // No se usa en cursiva en ninguna parte del sitio.
      styles: ['normal'],
      fallbacks: ['sans-serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    icon(),
    // lastmod ayuda a los buscadores a saber qué páginas revisar de nuevo.
    sitemap({ lastmod: new Date() }),
  ]
});
