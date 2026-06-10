import type { Locale } from '../consts';

export const ui = {
  zh: {
    'nav.home': '首页',
    'nav.posts': '文章',
    'nav.tags': '标签',
    'nav.about': '关于',
    'nav.search': '搜索',
    'post.toc': '目录',
    'post.prev': '上一篇',
    'post.next': '下一篇',
    'post.updated': '更新于',
    'post.readMore': '阅读全文',
    'tags.title': '标签',
    'tags.count': '篇文章',
    'search.title': '搜索',
    'search.placeholder': '搜索文章…',
    'comments.title': '评论',
    'pagination.prev': '上一页',
    'pagination.next': '下一页',
    'site.langName': '中文',
    'site.tagline': '个人博客 — 技术、思考与记录',
    'comments.unconfigured': '评论未配置（在 src/consts.ts 填入 Giscus repoId/categoryId 后启用）。',
  },
  en: {
    'nav.home': 'Home',
    'nav.posts': 'Posts',
    'nav.tags': 'Tags',
    'nav.about': 'About',
    'nav.search': 'Search',
    'post.toc': 'Contents',
    'post.prev': 'Previous',
    'post.next': 'Next',
    'post.updated': 'Updated',
    'post.readMore': 'Read more',
    'tags.title': 'Tags',
    'tags.count': 'posts',
    'search.title': 'Search',
    'search.placeholder': 'Search posts…',
    'comments.title': 'Comments',
    'pagination.prev': 'Previous',
    'pagination.next': 'Next',
    'site.langName': 'English',
    'site.tagline': 'A personal blog on tech, ideas, and notes',
    'comments.unconfigured': 'Comments are not configured yet — set Giscus repoId/categoryId in src/consts.ts.',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];

export function getLocaleFromUrl(url: URL): Locale {
  const [, seg] = url.pathname.split('/');
  return seg === 'en' ? 'en' : 'zh';
}

export function useTranslations(locale: Locale) {
  return function t(key: string): string {
    const dict = ui[locale] as Record<string, string>;
    return dict[key] ?? key;
  };
}

/** Prefix a root-relative path with the locale (zh stays at root). */
export function localizedPath(path: string, locale: Locale): string {
  if (locale === 'zh') return path;
  if (path === '/') return '/en/';
  return `/en${path}`;
}
