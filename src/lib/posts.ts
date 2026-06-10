import type { Locale } from '../consts';

type PostLike = { id: string; data: { pubDate: Date; draft: boolean } };

export function localeOf(id: string): string {
  return id.split('/')[0];
}

export function slugOf(id: string): string {
  return id.split('/').slice(1).join('/');
}

export function byLocale<T extends { id: string }>(posts: T[], locale: Locale): T[] {
  return posts.filter((p) => localeOf(p.id) === locale);
}

export function sortByDate<T extends PostLike>(posts: T[]): T[] {
  return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function isPublished(post: PostLike): boolean {
  return !post.data.draft;
}

/** Slug (without locale prefix) of the same post in `target` locale, or null. */
export function counterpartSlug<T extends { id: string }>(
  posts: T[],
  id: string,
  target: Locale,
): string | null {
  const slug = slugOf(id);
  const match = posts.find((p) => localeOf(p.id) === target && slugOf(p.id) === slug);
  return match ? slug : null;
}
