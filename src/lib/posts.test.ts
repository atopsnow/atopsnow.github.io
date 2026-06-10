import { describe, it, expect } from 'vitest';
import { localeOf, slugOf, byLocale, sortByDate, isPublished, counterpartSlug } from './posts';

type P = { id: string; data: { pubDate: Date; draft: boolean } };
const mk = (id: string, date: string, draft = false): P => ({
  id,
  data: { pubDate: new Date(date), draft },
});

describe('localeOf / slugOf', () => {
  it('splits id into locale and slug', () => {
    expect(localeOf('zh/hello-world')).toBe('zh');
    expect(slugOf('zh/hello-world')).toBe('hello-world');
    expect(localeOf('en/nested/post')).toBe('en');
    expect(slugOf('en/nested/post')).toBe('nested/post');
  });
});

describe('byLocale', () => {
  it('keeps only posts in the given locale', () => {
    const posts = [mk('zh/a', '2026-01-01'), mk('en/a', '2026-01-01')];
    expect(byLocale(posts, 'zh').map((p) => p.id)).toEqual(['zh/a']);
  });
});

describe('sortByDate', () => {
  it('orders newest first', () => {
    const posts = [mk('zh/old', '2026-01-01'), mk('zh/new', '2026-06-01')];
    expect(sortByDate(posts).map((p) => p.id)).toEqual(['zh/new', 'zh/old']);
  });
});

describe('isPublished', () => {
  it('is false for drafts and true otherwise', () => {
    expect(isPublished(mk('zh/a', '2026-01-01', true))).toBe(false);
    expect(isPublished(mk('zh/a', '2026-01-01', false))).toBe(true);
  });
});

describe('counterpartSlug', () => {
  it('finds the same slug in the other locale', () => {
    const posts = [mk('zh/hello', '2026-01-01'), mk('en/hello', '2026-01-01')];
    expect(counterpartSlug(posts, 'zh/hello', 'en')).toBe('hello');
  });
  it('returns null when no counterpart exists', () => {
    const posts = [mk('zh/only', '2026-01-01')];
    expect(counterpartSlug(posts, 'zh/only', 'en')).toBeNull();
  });
});
