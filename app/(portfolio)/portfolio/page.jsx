import PortfolioSection from '@/components/Protfolio/PortfolioSection';
import PageHero from '@/components/PageHero/PageHero';
import data from '@/Data.json';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Portfolio Projects',
  description:
    'Browse Hassan Raza portfolio of websites and web applications built with React, Next.js, WordPress, and modern frontend technologies.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  return (
    <>
      <div className="st-height-b80 st-height-lg-b80" />
      <PageHero
        title="Portfolio"
        subtitle="Selected projects across business websites, landing pages, and web apps."
      />
      <PortfolioSection data={data.portfolioData} />
    </>
  );
}
