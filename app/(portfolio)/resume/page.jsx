import Resume from '@/components/Resume/ResumeSection';
import PageHero from '@/components/PageHero/PageHero';
import data from '@/Data.json';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Resume & Experience',
  description:
    'View Hassan Raza resume, work experience, education, and professional background as a Web and App Developer.',
  path: '/resume',
});

export default function ResumePage() {
  return (
    <>
      <div className="st-height-b80 st-height-lg-b80" />
      <PageHero title="Resume" subtitle="Experience, education, and professional journey." />
      <Resume data={data.resumeData} />
    </>
  );
}
