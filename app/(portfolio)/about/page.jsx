import About from '@/components/About/About';
import PageHero from '@/components/PageHero/PageHero';
import data from '@/Data.json';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'About Hassan Raza',
  description:
    'Learn about Hassan Raza, a Web and App Developer from Karachi specializing in React, Next.js, WordPress, UI/UX, and performance-focused websites.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <div className="st-height-b80 st-height-lg-b80" />
      <PageHero title="About Me" subtitle="Web & App Developer from Karachi, Pakistan" />
      <About data={data.aboutData} />
    </>
  );
}
