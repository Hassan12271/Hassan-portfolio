import { notFound } from 'next/navigation';
import BlogPost from '@/components/Blog/BlogPost';
import JsonLd from '@/components/Seo/JsonLd';
import { getBlogPost, blogPosts } from '@/data/blogPosts';
import { BLOG_AUTHOR_META } from '@/lib/blog/automation';
import { createPageMetadata, siteConfig } from '@/lib/seo';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return createPageMetadata({
      title: 'Blog Post Not Found',
      noindex: true,
      path: `/blog/${slug}`,
    });
  }

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.imgLink,
    type: 'article',
    authors: [{ name: BLOG_AUTHOR_META }],
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${siteConfig.url}${post.imgLink}`,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: BLOG_AUTHOR_META,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <div className="st-height-b80 st-height-lg-b80" />
      <JsonLd data={articleSchema} />
      <BlogPost post={post} />
    </>
  );
}
