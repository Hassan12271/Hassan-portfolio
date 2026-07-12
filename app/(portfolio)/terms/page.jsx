import LegalPage from '@/components/Legal/LegalPage';
import PageHero from '@/components/PageHero/PageHero';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Terms of Service',
  description:
    'Terms of service for using hassanraxa.com, including website usage, contact form rules, and liability limitations.',
  path: '/terms',
});

const sections = [
  {
    heading: 'Acceptance of Terms',
    paragraphs: [
      'By accessing and using this website, you agree to these Terms of Service. If you do not agree, please do not use the site.',
    ],
  },
  {
    heading: 'Website Content',
    paragraphs: [
      'All content on this website, including text, images, portfolio work, and branding, is provided for informational purposes.',
      'Content may not be copied, reproduced, or redistributed without prior written permission.',
    ],
  },
  {
    heading: 'Contact Form Usage',
    paragraphs: [
      'You agree to provide accurate information when using the contact form and not to submit spam, abusive, or unlawful messages.',
      'We reserve the right to ignore or block abusive submissions.',
    ],
  },
  {
    heading: 'External Links',
    paragraphs: [
      'This website may contain links to third-party websites. We are not responsible for the content or policies of external sites.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    paragraphs: [
      'This website is provided on an "as is" basis. We make no warranties regarding uninterrupted availability or error-free operation.',
      'To the fullest extent permitted by law, Hassan Raza is not liable for damages arising from use of this website.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <div className="st-height-b80 st-height-lg-b80" />
      <PageHero title="Terms of Service" subtitle="Rules for using this website." />
      <LegalPage title="Terms of Service" sections={sections} />
    </>
  );
}
