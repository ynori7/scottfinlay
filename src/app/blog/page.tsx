import type { Metadata } from 'next';
import BlogList from '@/components/blog/BlogList';
import { getPaginatedPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Scott Finlay',
  description: 'Thoughts and articles on software development, application security, technology, and philosophy.',
  openGraph: {
    title: 'Blog — Scott Finlay',
    description: 'Thoughts and articles on software development, application security, technology, and philosophy.',
    url: 'https://www.scottfinlay.xyz/blog',
    siteName: 'Scott Finlay',
  },
  alternates: {
    canonical: 'https://www.scottfinlay.xyz/blog',
  },
};

export default function BlogPage() {
  const { posts, totalPages } = getPaginatedPosts(1);

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
            Thoughts on software development, security, technology, and philosophy.
          </p>
        </div>
      </header>

      {/* Article listing */}
      <section style={{ backgroundColor: '#f7f7f7', padding: '40px 0' }}>
        <div className="max-w-3xl mx-auto px-4">
          <BlogList posts={posts} currentPage={1} totalPages={totalPages} />
        </div>
      </section>
    </>
  );
}
