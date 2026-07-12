import Home3 from '@/views/Home3';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Home Demo V3',
  description: 'Alternate portfolio layout demo.',
  path: '/home-v3',
  noindex: true,
});

export default function HomeV3Page() {
  return <Home3 />;
}
