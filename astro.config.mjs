import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://keyshiiie.github.io',
  base: '/flexui-landing',
  integrations: [sitemap()],
});