export const siteConfig = {
  name: 'Hassan Raza',
  title: 'Hassan Raza | Web & App Developer in Karachi',
  description:
    'Hassan Raza is a Web and App Developer from Karachi, Pakistan. I build fast, SEO-friendly websites with React, Next.js, WordPress, and modern UI/UX.',
  url: 'https://www.hassanraxa.com',
  ogImage: '/images/section/Hassan-Raza.png',
  email: 'hassandanyal18@gmail.com',
  phone: '+92 3132453790',
  location: 'Gulshan-e-iqbal, Karachi, Pakistan',
  keywords: [
    'Hassan Raza',
    'Web Developer Karachi',
    'App Developer Pakistan',
    'React Developer',
    'Next.js Developer',
    'WordPress Developer',
    'Portfolio',
    'Freelance Web Developer',
  ],
};

export function createPageMetadata({
  title,
  description,
  path = '',
  noindex = false,
  ogImage,
  type = 'website',
}) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description ?? siteConfig.description;
  const canonicalPath = path.startsWith('/') || path === '' ? path : `/${path}`;
  const url = `${siteConfig.url}${canonicalPath}`;
  const image = ogImage ?? siteConfig.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: siteConfig.keywords,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [image],
    },
  };
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  jobTitle: 'Web & App Developer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Karachi',
    addressCountry: 'PK',
  },
  sameAs: [
    'https://github.com/Hassan12271',
    'https://www.linkedin.com/in/mr-hassan-raza/',
    'https://www.instagram.com/muhammedhassan.95/',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  author: {
    '@type': 'Person',
    name: siteConfig.name,
  },
};
