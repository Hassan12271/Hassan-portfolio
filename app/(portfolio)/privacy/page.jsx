import LegalPage from '@/components/Legal/LegalPage';
import PageHero from '@/components/PageHero/PageHero';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy policy for hassanraxa.com explaining how contact form data is collected, used, and protected.',
  path: '/privacy',
});

const sections = [
  {
    heading: 'Information We Collect',
    paragraphs: [
      'When you submit the contact form, we collect the information you provide such as your name, email address, phone number, subject, and message.',
      'We may also collect basic technical data such as browser type and request logs for security and performance monitoring.',
    ],
  },
  {
    heading: 'How We Use Your Information',
    paragraphs: [
      'Contact form submissions are used only to respond to your inquiry and discuss potential projects or services.',
      'We do not sell your personal information to third parties.',
    ],
  },
  {
    heading: 'Data Storage and Security',
    paragraphs: [
      'Messages are delivered through secure SMTP email delivery. We take reasonable steps to protect submitted information from unauthorized access.',
      'Please avoid sharing sensitive personal data through the contact form.',
    ],
  },
  {
    heading: 'Cookies and Analytics',
    paragraphs: [
      'This website may use cookies or similar technologies for basic functionality and performance. You can control cookies through your browser settings.',
    ],
  },
  {
    heading: 'Your Rights',
    paragraphs: [
      'You may request access, correction, or deletion of your contact information by emailing hassandanyal18@gmail.com.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <div className="st-height-b80 st-height-lg-b80" />
      <PageHero title="Privacy Policy" subtitle="How we handle your information." />
      <LegalPage title="Privacy Policy" sections={sections} />
    </>
  );
}
