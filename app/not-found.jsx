import Page404 from '@/components/404/Page404';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found on hassanraxa.com.',
  noindex: true,
  path: '/404',
});

export default function NotFound() {
  return <Page404 />;
}
