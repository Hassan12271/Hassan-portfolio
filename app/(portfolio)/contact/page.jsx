import Contact from '@/components/Contact/Contact';
import PageHero from '@/components/PageHero/PageHero';
import data from '@/Data.json';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Contact Hassan Raza',
  description:
    'Contact Hassan Raza for freelance web development, app development, and website projects. Available for remote and on-site work in Karachi.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <div className="st-height-b80 st-height-lg-b80" />
      <PageHero
        title="Contact"
        subtitle="Have a project in mind? Send a message and let's discuss your goals."
      />
      <Contact data={data.contactData} socialData={data.socialData} />
    </>
  );
}
