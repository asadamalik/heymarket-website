// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Deployed to GitHub Pages under a repo subpath.
  site: 'https://asadamalik.github.io',
  base: '/heymarket-website',
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
