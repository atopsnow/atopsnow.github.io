#!/usr/bin/env node
// Scaffold a new bilingual blog post (zh + en) with correct frontmatter.
//
// Usage:
//   npm run new:post -- <slug> [title]
// Examples:
//   npm run new:post -- hello-astro
//   npm run new:post -- hello-astro "Hello, Astro"
//
// Creates src/content/blog/zh/<slug>.md and src/content/blog/en/<slug>.md
// with draft: true. Edit the body, then flip draft to false to publish.

import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [slugArg, ...titleParts] = process.argv.slice(2);

if (!slugArg) {
  console.error('用法: npm run new:post -- <slug> [title]');
  console.error('例:   npm run new:post -- hello-astro "Hello, Astro"');
  process.exit(1);
}

const slug = slugArg.trim().toLowerCase().replace(/\s+/g, '-');
if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
  console.error(`slug 不合法: "${slug}" — 只允许小写字母、数字、连字符,且不以连字符开头。`);
  process.exit(1);
}

const title = titleParts.join(' ').trim();
const today = new Date().toISOString().slice(0, 10);
const root = fileURLToPath(new URL('..', import.meta.url));

// Double-quoted YAML string, safe for colons/quotes in the title.
const yamlStr = (s) => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

const variants = [
  { locale: 'zh', title: title || '新文章标题', description: '一句话摘要(用于列表和 SEO)。', tags: ['随笔'], body: '正文从这里开始。' },
  { locale: 'en', title: title || 'New Post Title', description: 'One-line summary (used in lists and SEO).', tags: ['misc'], body: 'Start writing here.' },
];

const exists = (p) => access(p).then(() => true).catch(() => false);

const made = [];
for (const v of variants) {
  const path = join(root, 'src', 'content', 'blog', v.locale, `${slug}.md`);
  if (await exists(path)) {
    console.error(`已存在,跳过: ${path.replace(root, '')}`);
    continue;
  }
  const frontmatter = [
    '---',
    `title: ${yamlStr(v.title)}`,
    `description: ${yamlStr(v.description)}`,
    `pubDate: ${today}`,
    `tags: [${v.tags.map((t) => JSON.stringify(t)).join(', ')}]`,
    'draft: true',
    '---',
    '',
    v.body,
    '',
  ].join('\n');
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, frontmatter, 'utf8');
  made.push(path.replace(root, ''));
}

if (made.length) {
  console.log('已创建:');
  for (const p of made) console.log('  ' + p);
  console.log('\n下一步: 编辑正文。中英两版用相同 slug 会自动互链;');
  console.log('完成后把 frontmatter 的 draft 改为 false 即可发布。');
} else {
  console.log('没有创建任何文件(可能都已存在)。');
}
