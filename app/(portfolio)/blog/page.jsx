import BlogListing from '@/views/BlogListing';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Blog',
  description:
    'Read Hassan Raza blog about Next.js, React, SEO, responsive design, WordPress, and UI/UX for modern websites.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <>
      <div className="st-height-b80 st-height-lg-b80" />
      <BlogListing />
    </>
  );
}
