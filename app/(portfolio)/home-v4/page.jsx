import Home4 from '@/views/Home4';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Home Demo V4',
  description: 'Alternate portfolio layout demo.',
  path: '/home-v4',
  noindex: true,
});

export default function HomeV4Page() {
  return <Home4 />;
}
