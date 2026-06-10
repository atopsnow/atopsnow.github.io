import { describe, it, expect } from 'vitest';
import { getLocaleFromUrl, useTranslations, localizedPath } from './ui';

describe('getLocaleFromUrl', () => {
  it('returns zh for root paths', () => {
    expect(getLocaleFromUrl(new URL('https://x.com/'))).toBe('zh');
    expect(getLocaleFromUrl(new URL('https://x.com/posts/a'))).toBe('zh');
  });
  it('returns en for /en paths', () => {
    expect(getLocaleFromUrl(new URL('https://x.com/en/'))).toBe('en');
    expect(getLocaleFromUrl(new URL('https://x.com/en/posts/a'))).toBe('en');
  });
});

describe('useTranslations', () => {
  it('translates known keys per locale', () => {
    expect(useTranslations('zh')('nav.about')).toBe('关于');
    expect(useTranslations('en')('nav.about')).toBe('About');
  });
  it('falls back to the key when missing', () => {
    expect(useTranslations('zh')('nonexistent.key')).toBe('nonexistent.key');
  });
});

describe('localizedPath', () => {
  it('keeps zh at root', () => {
    expect(localizedPath('/posts', 'zh')).toBe('/posts');
    expect(localizedPath('/', 'zh')).toBe('/');
  });
  it('prefixes en', () => {
    expect(localizedPath('/posts', 'en')).toBe('/en/posts');
    expect(localizedPath('/', 'en')).toBe('/en/');
  });
});
