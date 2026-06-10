export const SITE = {
  url: 'https://atopsnow.github.io',
  title: 'Topsnow',
  description: '个人博客 — 技术、思考与记录',
  author: 'atopsnow',
  defaultLocale: 'zh' as const,
  locales: ['zh', 'en'] as const,
};

export type Locale = (typeof SITE.locales)[number];

export const POSTS_PER_PAGE = 10;

// Giscus — fill in after enabling Discussions + installing the giscus app.
// See README.md "GitHub setup". Leave repoId/categoryId empty to disable comments.
export const GISCUS = {
  repo: 'atopsnow/atopsnow.github.io',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  mapping: 'pathname' as const,
};
