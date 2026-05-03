import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/blog';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    return {
      title: `${post.title} — Scott Finlay`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://www.scottfinlay.xyz/blog/${slug}`,
        siteName: 'Scott Finlay',
        ...(post.shareImage
          ? { images: [{ url: `https://www.scottfinlay.xyz${post.shareImage}` }] }
          : {}),
      },
      alternates: {
        canonical: `https://www.scottfinlay.xyz/blog/${slug}`,
      },
    };
  } catch {
    return { title: 'Not Found — Scott Finlay' };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      {/* Article header */}
      <header style={{ backgroundColor: '#222', paddingTop: '150px', paddingBottom: '40px' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Link
            href="/blog"
            style={{ color: '#aaa', fontSize: '13px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}
            className="hover:text-[#ee3030] transition-colors duration-200"
          >
            ← Back to Blog
          </Link>
          <h1
            className="font-bold"
            style={{ fontSize: 'clamp(24px, 4.5vw, 52px)', marginTop: '24px', marginBottom: '20px', lineHeight: 1.2, color: 'white' }}
          >
            {post.title}
          </h1>
          <p style={{ color: '#aaa', fontSize: '14px', margin: 0 }}>
            {formatDate(post.date)}
            {post.updateRemark && (
              <span style={{ color: '#888' }}> · {post.updateRemark}</span>
            )}
          </p>
        </div>
      </header>

      {/* Share image */}
      {post.shareImage && (
        <div style={{ backgroundColor: '#f7f7f7', textAlign: 'center', padding: '40px 20px 0' }}>
          <div className="max-w-3xl mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.shareImage}
              alt={post.title}
              style={{ display: 'block', maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto', borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}
            />
          </div>
        </div>
      )}

      {/* Article body */}
      <article style={{ backgroundColor: '#f7f7f7', padding: '60px 0 100px' }}>
        <div className="max-w-3xl mx-auto px-4">
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </>
  );
}
