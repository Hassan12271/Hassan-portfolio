import { siteConfig } from '@/lib/seo';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/landing', '/home-v2', '/home-v3', '/home-v4'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
