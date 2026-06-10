import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { byLocale, sortByDate, isPublished, slugOf } from '../lib/posts';
import { ui } from '../i18n/ui';
import { SITE } from '../consts';

export async function GET(context: APIContext) {
  const all = await getCollection('blog', isPublished);
  const posts = sortByDate(byLocale(all, 'zh'));
  return rss({
    title: SITE.title,
    description: ui.zh['site.tagline'],
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.pubDate,
      link: `/posts/${slugOf(p.id)}/`,
    })),
  });
}
