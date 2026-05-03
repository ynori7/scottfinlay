import Link from 'next/link';
import BlogArticleCard from '@/components/blog/BlogArticleCard';
import { type BlogPostMeta } from '@/lib/blog';

interface BlogListProps {
  posts: BlogPostMeta[];
  currentPage: number;
  totalPages: number;
}

function pageHref(page: number): string {
  return page === 1 ? '/blog' : `/blog/p/${page}`;
}

export default function BlogList({ posts, currentPage, totalPages }: BlogListProps) {
  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-center" style={{ color: '#999', fontSize: '18px', padding: '60px 0' }}>
          No posts yet — check back soon.
        </p>
      ) : (
        <div>
          {posts.map((post) => (
            <BlogArticleCard key={post.slug} {...post} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-12">
          {/* Previous */}
          {currentPage > 1 ? (
            <Link
              href={pageHref(currentPage - 1)}
              className="transition-colors duration-200"
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                color: '#ee3030',
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              ← Previous
            </Link>
          ) : (
            <span
              style={{
                padding: '8px 16px',
                border: '1px solid #eee',
                borderRadius: '4px',
                color: '#ccc',
                fontSize: '14px',
                cursor: 'not-allowed',
              }}
            >
              ← Previous
            </span>
          )}

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Link
              key={page}
              href={pageHref(page)}
              style={{
                padding: '8px 14px',
                border: `1px solid ${page === currentPage ? '#ee3030' : '#ddd'}`,
                borderRadius: '4px',
                backgroundColor: page === currentPage ? '#ee3030' : 'transparent',
                color: page === currentPage ? '#fff' : '#555',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: page === currentPage ? 700 : 400,
              }}
            >
              {page}
            </Link>
          ))}

          {/* Next */}
          {currentPage < totalPages ? (
            <Link
              href={pageHref(currentPage + 1)}
              className="transition-colors duration-200"
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                color: '#ee3030',
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              Next →
            </Link>
          ) : (
            <span
              style={{
                padding: '8px 16px',
                border: '1px solid #eee',
                borderRadius: '4px',
                color: '#ccc',
                fontSize: '14px',
                cursor: 'not-allowed',
              }}
            >
              Next →
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
