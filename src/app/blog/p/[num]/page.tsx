import type { Metadata } from 'next';
import BlogList from '@/components/blog/BlogList';
import { getPaginatedPosts, POSTS_PER_PAGE } from '@/lib/blog';

export const dynamicParams = false;

export async function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(1, POSTS_PER_PAGE);
  // Static export requires at least one pre-rendered path. We always generate
  // at least page 2; if there is only one page of content it will render an
  // empty listing via BlogList's empty-state message.
  const maxPage = Math.max(2, totalPages);
  return Array.from({ length: maxPage - 1 }, (_, i) => ({
    num: String(i + 2),
  }));
}

type Props = { params: Promise<{ num: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { num } = await params;
  const page = parseInt(num, 10);
  return {
    title: `Blog — Page ${page} — Scott Finlay`,
    openGraph: {
      title: `Blog — Page ${page} — Scott Finlay`,
      url: `http://www.scottfinlay.xyz/blog/p/${page}`,
      siteName: 'Scott Finlay',
    },
    alternates: {
      canonical: `http://www.scottfinlay.xyz/blog/p/${page}`,
    },
  };
}

export default async function BlogPageNum({ params }: Props) {
  const { num } = await params;
  const page = parseInt(num, 10);

  const { posts, totalPages } = getPaginatedPosts(page, POSTS_PER_PAGE);

  return (
    <>
      {/* Page header */}
      <header style={{ backgroundColor: '#222', paddingTop: '100px', paddingBottom: '40px' }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1
            className="uppercase font-bold"
            style={{ fontSize: 'clamp(28px, 5vw, 60px)', marginBottom: '16px', color: 'white' }}
          >
            Blog
          </h1>
          <hr
            style={{
              border: 'none',
              borderTop: '3px solid #ee3030',
              width: '70px',
              margin: '0 auto 20px',
            }}
          />
          <p style={{ color: '#aaa', fontSize: '18px', margin: 0 }}>
            Page {page} of {totalPages}
          </p>
        </div>
      </header>

      {/* Article listing */}
      <section style={{ backgroundColor: '#f7f7f7', padding: '40px 0' }}>
        <div className="max-w-3xl mx-auto px-4">
          <BlogList posts={posts} currentPage={page} totalPages={totalPages} />
        </div>
      </section>
    </>
  );
}
