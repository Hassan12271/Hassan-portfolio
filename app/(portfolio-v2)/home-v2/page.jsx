import Home2 from '@/views/Home2';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Home Demo V2',
  description: 'Alternate portfolio layout demo.',
  path: '/home-v2',
  noindex: true,
});

export default function HomeV2Page() {
  return <Home2 />;
}
