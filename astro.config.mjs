// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://hotelbarstools.com', // Update this with your actual domain
  build: {
    inlineStylesheets: 'auto',
    assets: '_assets'
  },
  compressHTML: true
});
