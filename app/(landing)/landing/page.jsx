import Landing from '@/views/Landing';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Portfolio Demos',
  description: 'Internal demo page for portfolio layout previews.',
  path: '/landing',
  noindex: true,
});

export default function LandingPage() {
  return <Landing />;
}
