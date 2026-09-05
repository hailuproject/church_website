#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from VITE_SITE_URL (or the SITE_URL env var).
 *
 * The site is a client-rendered SPA; route paths map 1:1 to React Router
 * routes in src/App.jsx. Only public routes are included (the /admin area is
 * excluded). If no site URL is configured the script exits successfully
 * without writing a sitemap so local/dev builds never emit broken URLs.
 *
 * Usage:
 *   VITE_SITE_URL=https://www.example.com npm run sitemap
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const root = fileURLToPath(new URL('..', import.meta.url));
const { VITE_SITE_URL } = loadEnv('production', root, '');
const siteUrl = (VITE_SITE_URL || process.env.VITE_SITE_URL || '').replace(/\/+$/, '');

const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/visit', priority: '0.8', changefreq: 'monthly' },
  { path: '/sermons', priority: '0.8', changefreq: 'daily' },
  { path: '/events', priority: '0.7', changefreq: 'weekly' },
  { path: '/resources', priority: '0.7', changefreq: 'weekly' },
  { path: '/gallery', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/donate', priority: '0.7', changefreq: 'monthly' },
];

if (!siteUrl) {
  console.log('[sitemap] VITE_SITE_URL not set — skipping sitemap generation.');
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.map(
  ({ path, priority, changefreq }) =>
    `  <url>\n` +
    `    <loc>${siteUrl}${path === '/' ? '/' : path}</loc>\n` +
    `    <lastmod>${today}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    `    <priority>${priority}</priority>\n` +
    `  </url>`
).join('\n');

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${urls}\n` +
  `</urlset>\n`;

await writeFile(resolve(root, 'public/sitemap.xml'), sitemap, 'utf8');
console.log(`[sitemap] Wrote public/sitemap.xml (${ROUTES.length} URLs, base ${siteUrl})`);
try {
  await readFile(resolve(root, 'public/robots.txt'), 'utf8');
} catch {
  console.warn('[sitemap] public/robots.txt not found');
}