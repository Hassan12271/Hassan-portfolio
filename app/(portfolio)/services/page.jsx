import Iconbox from '@/components/Iconbox/Iconbox';
import PageHero from '@/components/PageHero/PageHero';
import data from '@/Data.json';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Web Development Services',
  description:
    'Explore Hassan Raza services: Frontend Development, React, Next.js, WordPress, UI/UX Design, SMTP integration, SEO, and custom business websites.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <div className="st-height-b80 st-height-lg-b80" />
      <PageHero
        title="Services"
        subtitle="Modern web development, design, and deployment services for businesses and startups."
      />
      <Iconbox data={data.serviceData} />
    </>
  );
}
