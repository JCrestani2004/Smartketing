// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dirección oficial del sitio. La usan el sitemap, las URLs canónicas
  // y las etiquetas Open Graph para generar enlaces absolutos.
  site: 'https://brandoorsestudio.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [icon(), sitemap()]
});