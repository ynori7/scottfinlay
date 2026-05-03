import Link from 'next/link';
import { formatDate, type BlogPostMeta } from '@/lib/blog';

export default function BlogArticleCard({ slug, title, description, date, updateRemark, shareImage }: BlogPostMeta) {
  return (
    <article className="bg-white rounded mb-6" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
      {shareImage && (
        <div style={{ maxHeight: '220px', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shareImage}
            alt={title}
            style={{ width: '100%', objectFit: 'cover', display: 'block', maxHeight: '220px' }}
          />
        </div>
      )}
      <div className="p-6 md:p-8">
        <p style={{ fontSize: '13px', color: '#999', marginBottom: '8px', fontWeight: 500 }}>
          {formatDate(date)}
          {updateRemark && (
            <span style={{ color: '#bbb', fontWeight: 400 }}> · {updateRemark}</span>
          )}
        </p>
        <h2 style={{ fontSize: 'clamp(18px, 3vw, 24px)', marginBottom: '10px' }}>
          <Link
            href={`/blog/${slug}`}
            style={{ color: '#222', textDecoration: 'none' }}
            className="hover:text-[#ee3030] transition-colors duration-200"
          >
            {title}
          </Link>
        </h2>
        <p style={{ color: '#777', lineHeight: '1.7', marginBottom: '20px' }}>{description}</p>
        <Link
          href={`/blog/${slug}`}
          className="font-bold transition-colors duration-200"
          style={{ color: '#ee3030', textDecoration: 'none', fontSize: '14px' }}
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
