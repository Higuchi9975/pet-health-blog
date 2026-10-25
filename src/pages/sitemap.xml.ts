import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';

const SITE = 'https://pet-health-blog.pages.dev';

export const GET: APIRoute = async () => {
  const posts = await getPublishedPosts();
  const staticPaths = ['/', '/about/', '/privacy-policy/'];

  const urls = [
    ...staticPaths.map((path) => `  <url><loc>${SITE}${path}</loc></url>`),
    ...posts.map(
      (post) =>
        `  <url><loc>${SITE}/blog/${post.slug}/</loc><lastmod>${post.data.publishDate}</lastmod></url>`,
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
