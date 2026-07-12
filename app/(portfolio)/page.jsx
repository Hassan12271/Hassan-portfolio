import Home from '@/views/Home';
import JsonLd from '@/components/Seo/JsonLd';
import { createPageMetadata, personSchema, websiteSchema } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Web & App Developer in Karachi',
  description:
    'Hassan Raza builds fast, SEO-friendly websites and apps with React, Next.js, WordPress, and modern UI/UX. Available for freelance and on-site projects.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[personSchema, websiteSchema]} />
      <Home />
    </>
  );
}
