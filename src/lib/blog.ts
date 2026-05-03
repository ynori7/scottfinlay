import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

export const POSTS_PER_PAGE = 10;

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  shareImage?: string;
  date: string;
  updateRemark?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string; // rendered HTML
}

export function formatDate(dateString: string): string {
  // Parse as UTC date to avoid timezone-related off-by-one errors
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function readAllPostMeta(): BlogPostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

  return files.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      slug: data.slug as string,
      title: data.title as string,
      description: data.description as string,
      shareImage: (data.shareImage as string | undefined) || undefined,
      date: data.date as string,
      updateRemark: (data.updateRemark as string | undefined) || undefined,
    };
  });
}

export function getAllPosts(): BlogPostMeta[] {
  return readAllPostMeta().sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPaginatedPosts(
  page: number,
  perPage: number = POSTS_PER_PAGE,
): { posts: BlogPostMeta[]; totalPages: number; currentPage: number } {
  const allPosts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / perPage));
  const start = (page - 1) * perPage;
  const posts = allPosts.slice(start, start + perPage);
  return { posts, totalPages, currentPage: page };
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  if (!fs.existsSync(CONTENT_DIR)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

  for (const filename of files) {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    if (data.slug === slug) {
      const processed = await unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypePrettyCode, {
          theme: 'github-dark',
          keepBackground: true,
        })
        .use(rehypeStringify)
        .process(content);

      return {
        slug: data.slug as string,
        title: data.title as string,
        description: data.description as string,
        shareImage: (data.shareImage as string | undefined) || undefined,
        date: data.date as string,
        updateRemark: (data.updateRemark as string | undefined) || undefined,
        content: String(processed),
      };
    }
  }

  throw new Error(`Post not found: ${slug}`);
}
